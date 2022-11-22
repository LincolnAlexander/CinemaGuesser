
require('mongodb');
const express = require('express');
const axios = require("axios");
var sha256 = require('js-sha256');
const { ConnectionClosedEvent } = require('mongodb');
/*const router = express.Router();
const emailValidator = require('deep-email-validator');
const nodemailer = require('nodemailer');*/



/*async function isEmailValid(email) {
  return emailValidator.validate(email)
}*/


//Gaming
exports.setApp = function ( app, client )
{
//-----------------------------------VALIDATION ENDPOINTS-----------------------------------
// JWT Added by Casey
    app.post('/api/login', async (req, res, next) =>                      //login
    {
      // incoming: login, password
      // outgoing: firstName, lastName, error

    
      const { login, password } = req.body;
      var Password = '';
      if(password){
        Password = sha256.hmac('key', password);
      }
      const Login = req.body.login;
      const db = client.db();
      const results = await db.collection('Users').find({Login:Login,Password:Password}).toArray();
      var firstName = '';
      var lastName = '';
      var err;
      var ret;
      
      if( results.length > 0 )
      {
        firstName = results[0].FirstName;
        lastName = results[0].LastName;
        err = '';
        try {
          const token = require('./createJWT.js');
          ret = token.createToken(firstName, lastName);
        }
        catch (e) {
          ret = {error: e.message };
        }
      }
      else
      {
        ret = {error: "Login/Password incorrect"};
        err = "Login/Password incorrect"
      }
      //ret = {firstName: firstName, lastName: lastName, error: err}
      res.status(200).json(ret);
    });
 
    //Written by Casey




    app.post('/api/register', async (req, res, next) =>                   //register
    {
      var error = '';
      const { FirstName, LastName, Login, Pass, Email } = req.body;
      const Password = sha256.hmac('key', req.body.Pass);
      //stats and list(s) for user
      const Score = 0;
      const GamesPlayed = 0;
      const WatchList = [];
      const db = client.db();

      var err = '';
      var fn;
      var ln;
      var lgn;
      var eml;

      const resultsLogin = await db.collection('Users').find({Login:Login}).toArray();
      const resultsEmail = await db.collection('Users').find({Email:Email}).toArray();


      if(resultsLogin.length == 0 && resultsEmail.length == 0)
      {
        db.collection('Users').insertOne({FirstName, LastName, Login, Password, Score, GamesPlayed, WatchList, Email});
        fn = FirstName;
        ln = LastName;
        lgn = Login;
        eml = Email;
      }
      else
      {
        //error message generation
        if(resultsLogin.length != 0)
        {
          err += "Login "
        }
        if(resultsEmail.length != 0)
        {
          if(err != '')
            err += "and "
          err += "Email "
        }
        err += "already taken"
      }

      //const {valid, reason, validators} = await isEmailValid(req.body.Email);
      var ret = {firstname: fn, lastname: ln, login: lgn, email: eml, error: err};
      
      res.status(200).json(ret);
    });



//-----------------------------------LEADERBOARD ENDPOINTS------------------------------------
    //leaderboard endpoint that sorts by gamesplayed or score
    app.post('/api/leaderboard', async (req, res, next) =>                //leaderboard
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
            'GamesPlayed': 1,
            'FirstName': 1,
            'LastName': 1
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
    // Adjusted for JWT tokens ------
    app.post('/api/get_stats', async (req, res, next) =>                  //get_stats
    {
      //REQ: login
      
      let token = require('./createJWT.js');
      const{login, jwtToken} = req.body;

      try
      {
        if(token.isExpired(jwtToken))
        {
          var r = {error: 'The JWT token is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      const db = client.db();
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

      var refreshedToken = null;

      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }
      ret = {login: retlogin, score: score, gamesPlayed: gamesPlayed, error: err, jwtToken: refreshedToken};
      res.status(200).json(ret);
    });

     //perform operations on scores (ADJUST FOR JWT TOKEN)
     app.post('/api/op_stats', async (req, res, next) =>                  //op_stats
     {
       //REQ: login, value, mode, field, jwToken
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
      
      let token = require('./createJWT.js');
      const login = req.body.login;
      const jwtToken = req.body.jwtToken;
      try
      {
        if(token.isExpired(jwtToken))
        {
          var r = {error: 'The JWT token is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      const db = client.db();
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


       var refreshedToken = null;

      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }


       ret = {value: value, operation: op, field: field, error: err, jwtToken: refreshedToken};
       res.status(200).json(ret);
     });
//-----------------------------------MOVIE ENDPOINTS-----------------------------------
    //gets random movies (KEY)
    app.post('/api/movies', async (req, res, next) =>                     //movies
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
    app.post('/api/movies_saved', async (req, res, next) =>               //movies_saved
    {
      const fields = ['Title', 'Genre', 'BoxOffice', 
      'Actors', 'Plot', 'Poster', 'Ratings', 'Year'];
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
      const title_search = results[0].Title.toUpperCase();
      //const title_search = ("Harry Potter and the Deathly Hallows: Part 2").toUpperCase();
      var omdb_ret = {};
      //look in MoviesSaved
      const find_title = await db.collection('MoviesSaved').find({Title:title_search}).toArray();
      
      //if movie isn't in MoviesSaved -> OMDB -> Movies saved
      //if movie is in MoviesSaved -> get
      if(find_title.length == 0)
      {
        console.log("\x1b[36mMaking OMDB request\x1b[0m");
        /*var result = await makeGetRequest(title_search);
        omdb_ret = parseFields(fields, result);
        //uppercase title to make consistant
        omdb_ret["Title"] = omdb_ret["Title"].toUpperCase();
        db.collection('MoviesSaved').insertOne(omdb_ret);*/
        console.log("get request");
      }
      else
      {
        omdb_ret = find_title[0];
      }
      //******

      var ret = {omdb: omdb_ret, title: title_search, error: err};
      res.status(200).json(ret);
    });

    //parses json to get certain fields in 'fields'
    function parseFields(fields, json)
    {
      var ret = {};
      for (var key of Object.keys(json)) {
        // -1 if not in array
        if(fields.indexOf(key) >= 0){
          ret[key] = json[key];
          //specially parse ratings
          if(key == 'Ratings'){
            ret[key] = parseRatings(json[key]);
          }
        }
      }
      return ret;
    }
    //acccepts Array and parses 'Ratings' from OMDB for rotten tomatoes
    function parseRatings(ratings){
      //ret is string
      var ret;
      for(let i = 0; i < ratings.length; i++){
        if(!ret){
          ret = ratings[i]["Value"];
        }
        if(ratings[i]["Source"] === "Rotten Tomatoes"){
          ret = ratings[i]["Value"];
          break;
        }
      }
      return ret;
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