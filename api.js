require('express');
require('mongodb');
const axios = require("axios");
var sha256 = require('js-sha256');

//Gaming
exports.setApp = function ( app, client )
{
    
    app.post('/api/login', async (req, res, next) =>             //login
    {
      // incoming: login, password
      // outgoing: firstName, lastName, error
     var error = '';
    
      const { login, password } = req.body;
      const hash = sha256.hmac('key', password);

      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:hash}).toArray();
    
      var fn = '';
      var ln = '';
      var err = 'invalid login';
    
      if( results.length > 0 )
      {
        fn = results[0].FirstName;
        ln = results[0].LastName;
        err = '';
      }
    
      var ret = { firstName:fn, lastName:ln, error: err};
      res.status(200).json(ret);
    });
 
    //Written by Casey
    app.post('/api/register', async (req, res, next) =>          //register
    {
      var error = '';
      const { FirstName, LastName, Login, Pass } = req.body;
      const Password = sha256.hmac('key', req.body.Password);
      const Score = 0;
      const db = client.db();

      var err = 'Username Taken';
      var pass = '';
      var fn = '';
      var ln = '';
      var lgn = '';

      const results = await db.collection('Users').find({Login:Login}).toArray();


      if(results.length == 0)
      {
        db.collection('Users').insertOne({FirstName, LastName, Login, Password, Score});
        fn = FirstName;
        ln = LastName;
        lgn = Login;
        pass = Pass;
        err = '';
      }

      var ret = {firstname: fn, lastname: ln, login: lgn, error: err}
      res.status(200).json(ret);
    });

    //get scores (ADJUST FOR JWT TOKEN)
    app.post('/api/get_score', async (req, res, next) =>         //get_score
    {
      //REQ: login
      const db = client.db();
      const{login} = req.body;
      const results = await db.collection('Users').find({Login:login}).toArray();
      var err = '';
      var Score;
      //check if record exists
      if(results.length == 0)
      {
        err = 'no record found';
      }
      else
      {
        Score = results[0].Score;
      }
      var ret = {score: Score};
      res.status(200).json(ret);
    });

    //update scores (ADJUST FOR JWT TOKEN)
    app.post('/api/update_score', async (req, res, next) =>         //update_score
    {
      //REQ: login, score
      const db = client.db();
      const{login} = req.body;
      const results = await db.collection('Users').find({Login:login}).toArray();
      var err = '';
      var Score = results[0].Score;
      //check if record exists
      if(results.length == 0)
      {
        err = 'no record found';
      }
      else
      {
        Score = req.body.score;
        const replace_result = await db.collection('Users').updateOne({Login:login}, {$set: { "Score" : Score}});
        console.log(replace_result);
      }
      var ret = {score: Score};
      res.status(200).json(ret);
    });

    //gets random movies
    app.get('/api/movies', async (req, res, next) =>             //movies
    {
      const db = client.db();
      var err = '';
      //get 1 random movie title from database
      const results = await db.collection('Movies').aggregate([
        {
          '$sample': {
            'size': 1
          }
        }
      ]).toArray();
      const Title = results[0].Title;

      //make request to OMDB with that random movie title
      const omdb_ret = await makeGetRequest(Title);
      //if bad movie
      if(omdb_ret.Response == 'False'){
        err = 'Invalid Movie: remove ' + Title;
        //Add auto removal of invalid movie here
      }

      var ret = {omdb: omdb_ret, title: Title, error: err};
      res.status(200).json(ret);
    });

    //gets random movies from MoviesSaved database 
    //(unethical, but I wanted to develop this)
    //this also gives more limited information compared to api/movies
    app.get('/api/movies_saved', async (req, res, next) =>       //movies_saved
    {
      const db = client.db();
      var err = '';
      var omdb_ret;
      //get 1 random movie title from database
      const results = await db.collection('Movies').aggregate([
        {
          '$sample': {
            'size': 1
          }
        }
      ]).toArray();
      const title_search = results[0].Title;

      //look in MoviesSaved
      const find_title = await db.collection('MoviesSaved').find({Title:title_search}).toArray();

      //if title is in MoviesSaved database
      if(find_title.length != 0)
      {
        const Title = find_title[0].Title;
        const Genre = find_title[0].Genre;
        const BoxOffice = find_title[0].BoxOffice;
        const Actors = find_title[0].Actors;
        const Plot = find_title[0].Plot;
        const Poster = find_title[0].Poster;
        const Rating = find_title[0].Rating;
        omdb_ret = {Title: Title, Genre: Genre, BoxOffice: BoxOffice, Actors: Actors, Plot: Plot, Poster: Poster, Rating: Rating};
      }
      else
      {
        //make request to OMDB with that random movie title
        omdb_ret = await makeGetRequest(title_search);

        //if bad movie
        if(omdb_ret.Response == 'False'){
          err = 'Invalid Movie: remove ' + title_search;
          //Add auto removal of invalid movie here
        }
        else
        {
          const Title = omdb_ret.Title;
          const Genre = omdb_ret.Genre;
          const BoxOffice = omdb_ret.BoxOffice;
          const Actors = omdb_ret.Actors;
          const Plot = omdb_ret.Plot;
          const Poster = omdb_ret.Poster;

          //get rating (might not be rotten tomatoes)
          var get_rating = omdb_ret.Ratings[0].Value;
          for (let i = 0; i < omdb_ret.Ratings.length; i++) {
            if(omdb_ret.Ratings[i].Source == 'Rotten Tomatoes')
              get_rating = omdb_ret.Ratings[i].Value;
          }

          const Rating = get_rating;

          //save movie data to MoviesSaved
          db.collection('MoviesSaved').insertOne({Title, Genre, BoxOffice, Actors, Plot, Poster, Rating});
          omdb_ret = {Title: Title, Genre: Genre, BoxOffice: BoxOffice, Actors: Actors, Plot: Plot, Poster: Poster, Rating: Rating};
        }

      }

      var ret = {omdb: omdb_ret, title: title_search, error: err};
      res.status(200).json(ret);
    });
    
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