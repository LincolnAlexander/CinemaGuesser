require('express');
require('mongodb');
const axios = require("axios");
var sha256 = require('js-sha256');

//Gaming
exports.setApp = function ( app, client )
{
//-----------------------------------VALIDATION ENDPOINTS-----------------------------------
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
      var ret;
    
      if( results.length > 0 )
      {
        fn = results[0].FirstName;
        ln = results[0].LastName;
        err = '';
        try {
          const token = require('./createJWT.js');
          ret = token.createToken(fn, ln);
        }
        catch (e) {
          ret = {error: e.message };
      }
      }
      else
      {
        ret = {error: "Login/Password incorrect"};
      }
    
      //ret = { firstName:fn, lastName:ln, error: err};
      res.status(200).json(ret);
    });
 
    //Written by Casey
    app.post('/api/register', async (req, res, next) =>          //register
    {
      var error = '';
      const { FirstName, LastName, Login, Pass } = req.body;
      const Password = sha256.hmac('key', req.body.Password);
      //stats and list(s) for user
      const Score = 0;
      const GamesPlayed = 0;
      const WatchList = [];
      const db = client.db();
      

      var err = 'Username Taken';
      var pass = '';
      var fn = '';
      var ln = '';
      var lgn = '';

      const results = await db.collection('Users').find({Login:Login}).toArray();


      if(results.length == 0)
      {
        db.collection('Users').insertOne({FirstName, LastName, Login, Password, Score, GamesPlayed, WatchList});
        fn = FirstName;
        ln = LastName;
        lgn = Login;
        pass = Pass;
        err = '';
      }

      var ret = {firstname: fn, lastname: ln, login: lgn, error: err}
      res.status(200).json(ret);
    });
//-----------------------------------LEADERBOARD ENDPOINTS------------------------------------
    //leaderboard endpoint that sorts by gamesplayed or score
    app.post('/api/leaderboard', async (req, res, next) =>         //leaderboard
    {
      //REQ: page, per_page(default=10), sortby
      var per_page = req.body.per_page;
      if(!req.body.per_page){
        per_page = 10
      }
      const db = client.db();
      //MongoDB pipeline sort -> project -> skip -> limit
      var pipeline = [
        {
          '$sort': {
            //define with req.body.sortby below
          }
        }, {
          '$project': {
            'Login': 1, 
            'Score': 1, 
            'GamesPlayed': 1
          }
        }, {
          '$skip': (per_page * req.body.page)
        }, {
          '$limit': per_page
        }
      ]
      //build the $sort
      pipeline[0]['$sort'][req.body.sortby] = 1;

      const results = await db.collection('Users').aggregate(pipeline).toArray();
      var ret = {list: results};
      res.status(200).json(ret);
    });
//-----------------------------------STATS ENDPOINTS-----------------------------------
    //get scores (ADJUST FOR JWT TOKEN)
    app.post('/api/get_stats', async (req, res, next) =>         //get_stats
    {
      //REQ: login
      
      const db = client.db();
      const{login} = req.body;
      const results = await db.collection('Users').find({Login:login}).toArray();
      var err = '';

      //Courtney Additions
      var score;
      var gamesPlayed;
      var ret;
      var retlogin;

      //check if record exists
      if(results.length == 0)
      {
        err = 'no record found';
      }
      else
      {
        //Courtney Addition
        score = results[0].Score;
        gamesPlayed = results[0].GamesPlayed;
        retlogin = login;

      }
      ret = {login: retlogin, score: score, gamesPlayed: gamesPlayed, error: err};
      res.status(200).json(ret);
    });

     //perform operations on scores (ADJUST FOR JWT TOKEN)
     app.post('/api/op_stats', async (req, res, next) =>         //op_stats
     {
       //REQ: login, value, mode, field
       //MODE OPs
       /*
       0: set
       1: add
       */
      var op;
      var field;
      var ret;
      var value;
      var mode;
      var err = '';
      
      const db = client.db();
      const{login} = req.body;
      const results = await db.collection('Users').find({Login:login}).toArray();
      
      //check if record exists
      if(req.body.field != "Score" && req.body.field != "GamesPlayed"){
        err = 'invalid field specified';
      }
      else if(results.length == 0)
       {
        err = 'no record found';
       }
       else
       {
        mode = req.body.mode;
        field = req.body.field;
        value = results[0][field];
        if(!req.body.mode){
          mode = 0;
        }
         //set mode
         if(mode == 0){
          value = req.body.value;
          op = 'set';
         }
         //add mode
         else if(mode == 1){
          value += req.body.value;
          op = 'add';
         }
         var obj = {'$set': {}};
         obj['$set'][field] = value;
         await db.collection('Users').updateOne({Login:login}, obj);
       }
       ret = {value: value, operation: op, field: field, error: err};
       res.status(200).json(ret);
     });
//-----------------------------------MOVIE ENDPOINTS-----------------------------------
    //gets random movies (KEY)
    app.post('/api/movies', async (req, res, next) =>             //movies
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
    app.post('/api/movies_saved', async (req, res, next) =>       //movies_saved
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