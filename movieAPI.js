require('mongodb');
const axios = require("axios");

module.exports = function ( app, client ){
//-----------------------------------MOVIE ENDPOINTS-----------------------------------\
    //query movie from MoviesSaved then OMDB if not in MoviesSaved
    const queryMovies = async (req, res, next) => {
        //IN - movie_requests

        //define things
        const db = client.db();
        var movie_requests = req.body.movie_requests

        //fields to parse later
        const fields = ['Title', 'Genre', 'BoxOffice', 
            'Actors', 'Plot', 'Poster', 'Ratings', 'Year', 
            'Director', 'Runtime', 'Released', 'Rated'];

        //error message
        if(!Array.isArray(movie_requests)){
            res.status(200).json({error: "ERROR: mismatch input on movie_requests"});
            return;
        }
        if(movie_requests.length == 0){
            res.status(200).json({error: "ERROR: empty input on movie_requests"});
            return;
        }


        //get all movie titles to lowercase
        for(let i = 0; i < movie_requests.length; i++){
            if(movie_requests[i] === null){
                res.status(200).json({error: "ERROR: null type found in array"});
                return;
            }
            movie_requests[i] = movie_requests[i].toLowerCase();
        }
            

        //filter out movies not in Movies
        const movie_consistancy = await db.collection('Movies').find({Title:{$in:movie_requests}}).toArray();

        var movie_titles = []
        var movie_ids = []
        var id_obj = {}
        //unpack titles to array
        for(let i = 0; i < movie_consistancy.length; i++){
            movie_titles.push(movie_consistancy[i].Title);
            movie_ids.push(movie_consistancy[i]._id);
            id_obj[movie_consistancy[i].Title] = movie_consistancy[i]._id
        }
        
        //to find movies that need to be queried by OMDB
        var found_movies = [];
        //look in MoviesSaved
        var find_titles = await db.collection('MoviesSaved').find({TitleID:{$in:movie_ids}}).toArray();
        
        var omdb_ret = [];
        //iterate over all movies in found_movies, getting the title and the returned json
        for(let i = 0; i < find_titles.length; i++){
            omdb_ret.push(find_titles[i])
            found_movies.push(find_titles[i].Title.toLowerCase())
        }
        
        //set difference between movie_titles and found_movies
        let unfound_movies = movie_titles.filter(x => !found_movies.includes(x));
        let error_movies = [];
        //make omdb request on remaining movies
        for(let i = 0; i < unfound_movies.length; i++){

            console.log("\x1b[36mMaking OMDB request on " + unfound_movies[i] +" " + (i+1) + " of " + unfound_movies.length + "\x1b[0m");
            var result = await makeGetRequest(unfound_movies[i]);

            if(result.Response !== "False")
            {
                let temp_ret = parseFields(fields, result);
                //lower title to make consistant
                temp_ret["Title"] = temp_ret["Title"].toLowerCase();
                temp_ret["TitleID"] = id_obj[temp_ret["Title"]];

                //if error occurs with sotring TitleID don't store instance
                if(temp_ret["TitleID"])
                {
                    db.collection('MoviesSaved').insertOne(temp_ret);
                }
                else{
                    console.log("\x1b[31mTitleID error on " + unfound_movies[i] + '. Should be ' + temp_ret["Title"] + "\x1b[0m");
                    error_movies.push(temp_ret["Title"])
                }
                omdb_ret.push(temp_ret);
                found_movies.push(temp_ret.Title);
            }
            else
            {
                console.log(unfound_movies[i] + " not recognized by OMDB")
            }

        }
        //let unprocessed_movies = movie_requests.filter(x => !movie_titles.includes(x));
        //console.log("UNPROCESSED: ", unprocessed_movies)
        //console.log("EXECUTED ON: ", movie_titles)
        //console.log("MISSING: ", unfound_movies)
        console.log("ERRORS: ", error_movies)
        var ret = {omdb: omdb_ret, found_movies: found_movies};
        res.status(200).json(ret);
    }
    
    //for testing purposes (need password)
    app.post('/api/all_movies', async (req, res, next) =>  {
        if(req.body.password !== process.env.ALL_MOVIES_PASS){
            res.status(200).json({error: "ERROR: invalid password field"});
            return
        }

        const db = client.db();
        const all_movies = await db.collection('Movies').find().toArray();
        let titles = [];
        for(let i = 0; i < all_movies.length; i++){
            titles.push(all_movies[i].Title);
        }

        req.body.movie_requests = titles;
        next();
    },queryMovies);

    //gets random movies (KEY)
    app.post('/api/movies', async (req, res, next) =>                     //movies (FORTIFIED V2)
    {
        
        //REQ: filter (array)
        
        const fields = ['Title', 'Genre', 'BoxOffice', 
            'Actors', 'Plot', 'Poster', 'Ratings', 'Year'];

        //---------------------------MAKE PIPELINE FILTER---------------------------
        //set defaults for filter by title
        var filter = [];
        if(Array.isArray(req.body.filter))
        filter = req.body.filter;
        
        //capitalize all movie titles in 'Movies'
        var filter_pipeline = [];
        for(let i = 0; i < filter.length; i++)
        {
        var obj = {Title: {$not: {$eq: filter[i]}}};
        filter_pipeline.push(obj);
        }
        
        var pipeline = [{
        $project: {
            "Title": { $toLower: "$Title" }
        }
        }]
        
        if(filter_pipeline.length != 0){
        pipeline.push({$match: {$and: filter_pipeline}})
        }
        pipeline.push({
        '$sample': {
            'size': 1
        }
        });
        //--------------------------------------------------------------------------
        
        const db = client.db();
        var err = '';
        //get 1 random movie title from database
        const results = await db.collection('Movies').aggregate(pipeline).toArray();
        const Title = results[0].Title;
        
        //make request to OMDB with that random movie title
        const omdb_ret = await makeGetRequest(Title);
        //if bad movie
        if(omdb_ret.Response == 'False'){
        err = 'Invalid Movie: remove ' + Title;
        //Add auto removal of invalid movie here
        }
        let new_ret = parseFields(fields, omdb_ret);

        var ret = {omdb: [new_ret], title: Title, error: err};
        res.status(200).json(ret);
    });
    
    //gets random movies from MoviesSaved database 
    //(unethical, but I wanted to develop this)
    //this also gives more limited information compared to api/movies
    app.post('/api/movies_saved', async (req, res, next) =>               //movies_saved (FORTIFIED V2)
    {
        //REQ: filter (array)
        
        //---------------------------MAKE PIPELINE FILTER---------------------------
        //set defaults for filter
        var filter = [];
        if(Array.isArray(req.body.filter))
            filter = req.body.filter;
        
        //filter out movies by not including them in random sampling
        var filter_pipeline = [];
        for(let i = 0; i < filter.length; i++)
        {
            var obj = {Title: {$not: {$eq: filter[i]}}};
            filter_pipeline.push(obj);
        }
        
        //make pipeline
        var pipeline = [{
        $project: {
            "Title": { $toLower: "$Title" }
        }
        }]
        
        //if nothing in filter make without '$match' and '$not'
        if(filter_pipeline.length != 0)
            pipeline.push({$match: {$and: filter_pipeline}})
        
        //get one random movie
        pipeline.push({
        '$sample': {
            'size': 1}
        });
        //--------------------------------------------------------------------------
        
        const db = client.db();
        
        //get 1 random movie title from database (with filter)
        const results = await db.collection('Movies').aggregate(pipeline).toArray();

        //put one movie in array for queryMovies
        req.body.movie_requests = [results[0].Title]
        //req.body.movie_requests = ['AVENgers: endgame']
        next();

    }, queryMovies);

    //grab movies by array
    app.post('/api/movies_get', queryMovies);
  
    //parses json to get certain fields in 'fields'
    function parseFields(fields, json)
    {
        var ret = {};
        for (var key of Object.keys(json)) {
        // -1 if not in array
        if(fields.indexOf(key) >= 0){
            
            //adjusted for TV shows
            if(key === 'Runtime'){
                if(json['Type'] === 'series')
                    ret['totalSeasons'] = json['totalSeasons'];
                else
                    ret[key] = json[key]
                continue;
            }
            if(key === 'Director'){
                if(json['Type'] === 'series')
                    ret['Writer'] = json['Writer'];
                else
                    ret[key] = json[key]
                continue;
            }

            ret[key] = json[key];
            //specially parse ratings
            if(key === 'Ratings'){
            var {rating, source} = parseRatings(json[key]);
            ret[key] = rating;
            ret["Source"] = source;
            }
            
        }
        }
        return ret;
    }

    //acccepts Array and parses 'Ratings' from OMDB for rotten tomatoes
    function parseRatings(ratings){
        //ret is string
        var ret;
        var source;
        for(let i = 0; i < ratings.length; i++){
        if(!ret){
            ret = ratings[i]["Value"];
            source = ratings[i]["Source"];
        }
        if(ratings[i]["Source"] === "Rotten Tomatoes"){
            ret = ratings[i]["Value"];
            source = ratings[i]["Source"];
            break;
        }
        }
        return {rating: ret, source: source};
    }

    //function that makes requests to OMDB using promises and axios
    function makeGetRequest(search) {                            //makeGetRequest function
        return new Promise(function (resolve, reject) {
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.APIKEY}&`, {
        params : {
            t: search
        }
        }).then(
        (response) => {
            var result = response.data;
            console.log('Processing Request');
            resolve(result);
        },
        (error) => {
            reject(error);
        }
        );
        });
    }//end of function
    }