
require('mongodb');
const express = require('express');

var sha256 = require('js-sha256');
const { ConnectionClosedEvent } = require('mongodb');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//Gaming
exports.setApp = function ( app, client )
{
//-----------------------------------VALIDATION ENDPOINTS-----------------------------------
  // JWT Added by Casey
  app.post('/api/login', async (req, res, next) =>                      //login (FORTIFIED V2)
  {
    // incoming: login, password
    // outgoing: firstName, lastName, error
    
    const { login, password } = req.body;
    if(!password || !login || password == null || login == null){
      var ret = {error: "ERROR: Empty field(s)"} 
      res.status(200).json(ret);
      return
    }
    var Password = '';
    if(password){
      Password = sha256.hmac('key', password);
    }
    
    const db = client.db();
    //This line inherently makes this endpoint foritfied (just return nothing if empty inputs)
    var results = await db.collection('Users').find({Login:login,Password:Password}).toArray();
    var firstName = '';
    var lastName = '';
    var verify = '';
    var err;
    var ret;
    
    if( results.length > 0 )
    {
      firstName = results[0].FirstName;
      lastName = results[0].LastName;
      verify = results[0].Verify;
      err = '';
      
      //check email verification
      //console.log(results)
      if(results[0].Verify !== null && results[0].Verify === false)
      {
        ret = {error: "Email isn't verified"};
        res.status(200).json(ret);
        return;
      }
      
      try 
      {
        const token = require('./createJWT.js');
        ret = token.createToken(firstName, lastName);
        ret.email = results[0].Email;
      }
      catch (e) {
        ret = {error: e.message };
      }
    }
    else
    {
      ret = {error: "Login/Password incorrect"};
    }
    
    //ret = {firstName: firstName, lastName: lastName, error: err}
    res.status(200).json(ret);
  });
  
  //Written by Casey
  app.post('/api/register', async (req, res, next) =>                   //register (FORTIFY V1)
  {
    
    //password (and hashing) for user
    var Verify = false;
    var password = '';
    const { FirstName, LastName, Login, Pass, Email } = req.body;
    if(!FirstName || !LastName || !Login || !Pass || !Email){
      var ret = {error: "ERROR: Empty field(s)"} 
      res.status(200).json(ret);
      return
    }
    
    if(Pass)
    password = Pass
    const Password = sha256.hmac('key', password);
    
    //stats and list(s) for user
    const Score = 0;
    const GamesPlayed = 0;
    const WatchList = [];
    
    const db = client.db();
    
    var err = '';
    
    const resultsLogin = await db.collection('Users').find({Login:Login}).toArray();
    const resultsEmail = await db.collection('Users').find({Email:Email}).toArray();
    
    if(password == '')
    {
      err = "empty Pass field"
    }
    else if(!FirstName || !LastName || !Login || !Email){
      err = "empty non-Pass field"
    }
    else if(resultsLogin.length == 0 && resultsEmail.length == 0)
    {
      try 
      {
        
        const token = require('./createJWT.js');
        var ret = token.createToken(FirstName, LastName);
        
        //in production or not in production
        let bp = require('./frontend/src/components/Paths.js');
        //'https://cinema-guesser.herokuapp.com/register-success?key='
        var mes;
        var route = 'register-success?key=';
        if (process.env.NODE_ENV === 'production') 
        {
          mes = 'https://cinema-guesser.herokuapp.com/' + route;
        }
        else
        {        
          mes = 'http://localhost:3000/' + route;
        }
        let link = '<body>Click <a href="'+ mes + ret.accessToken+ '">here</a> to validate your account.</body>'
        
        //make message
        const msg = {
          to: Email,
          from: 'cinemaguesser.devteam@gmail.com',
          subject: 'Email Verification Needed',
          text: 'Please click this link to confirm your email',
          html: link,
        }
        //if (buildPath() !== 'http://localhost:5000/') {
        sgMail.send(msg)
        .then(()=>
        {
          console.log('Email sent')
        })
        .catch((error) =>
        {
          console.log(error)
        })
        // }
      }
      catch (e) 
      {
        ret = {error: e.message };
      }
      const Key = ret.accessToken 
      const createdAt = new Date();
      await db.collection('Users').insertOne({FirstName, LastName, Login, Password, Score, GamesPlayed, WatchList, Email, Verify, Key, createdAt});
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
    
    var ret;
    if(err != '')
    ret = {error: err}
    else
    ret = {firstname: FirstName, lastname: LastName, login: Login, verify: Verify,email: Email, error: err};
    
    res.status(200).json(ret);
  });
//-----------------------------------PROFILE ENDPOINTS-----------------------------------
  //jwt safe
  app.post('/api/update_profile', async (req, res, next) =>
  {
    //IN - firstName, lastName, password, login, jwtToken
    
    var{firstName, lastName, password, login, jwtToken} = req.body;
    
    //check jwt
    let token = require('./createJWT.js');
    
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
    
    let password_flag = true;
    
    //hash password if it exists
    if(password && typeof(password) === 'string'){
      password = sha256.hmac('key', password);
    }
    
    //find user through login
    const db = client.db();
    //This line inherently makes this endpoint foritfied (just return nothing if empty inputs)
    var results = await db.collection('Users').find({Login:login}).toArray();
    
    //user was not found
    if(results.length == 0)
    {
      var r = {error: 'No user found'};
      res.status(200).json(r);
      return;
    }
    
    //set firstName, lastName, password if empty
    if(!firstName)
    firstName = results[0].FirstName;
    if(!lastName)
    lastName = results[0].LastName;
    if(!password || password === results[0].Password){
      password = results[0].Password;
      password_flag = false
    }
    
    
    //update info
    var obj = {'$set': {Password: password, FirstName: firstName, LastName: lastName}};
    await db.collection('Users').updateOne({Login:login}, obj);
    
    var refreshedToken = null;
    
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch
    {
      console.log(e)
    }
    
    ret = {login: login, changed_password: password_flag, firstName: firstName, lastName: lastName, jwtToken: refreshedToken.accessToken};
    res.status(200).json(ret);
  });
//-----------------------------------LEADERBOARD ENDPOINTS------------------------------------
  //leaderboard endpoint that sorts by gamesplayed or score 
  app.post('/api/leaderboard', async (req, res, next) =>                //leaderboard (FORTIFIED V1)
  {
    //REQ: page, per_page(default=10), sortby
    
    //prevent negative values
    var page = req.body.page > 0 ? req.body.page : 0;
    var per_page = req.body.per_page >= 0 ? req.body.per_page : 1;
    //prevent invalid sortby
    var sortby = req.body.sortby;
    if(sortby != "Score" && sortby != "GamesPlayed")
    sortby = "Score"
    
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
        '$skip': (per_page * page)
      }, {
        '$limit': per_page
      }
    ]
    //build the $sort
    pipeline[0]['$sort'][sortby] = -1;
    var results = await db.collection('Users').aggregate(pipeline).toArray();
    
    //create number array to make it easier on the front end to make display
    for(let i = 0; i < results.length; i++){
      results[i]["Rank"] = i + 1 + (per_page * page)
    }
    
    var user_count = await db.collection('Users').countDocuments();
    var ret = {list: results, count: user_count};
    res.status(200).json(ret);
  });
//-----------------------------------STATS ENDPOINTS-----------------------------------
  //get scores (ADJUST FOR JWT TOKEN)
  // Adjusted for JWT tokens ------
  app.post('/api/get_stats', async (req, res, next) =>                  //get_stats (FORTIFIED JWT)
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
  app.post('/api/op_stats', async (req, res, next) =>                  //op_stats (FORTIFIED JWT)
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
  
//-----------------------------------EMAIL ENDPOINTS-----------------------------------
  //validate from sent email (this is after user clicks on link)
  app.post('/api/email_verify', async (req, res, next) => 
  {
    db = client.db();
    const token = require('./createJWT.js');
    //db.collection('Users').createIndex( { "createdAttwo": 1 }, { expireAfterSeconds: 10 } )
    
    //get key and search in database
    var key = req.query.key;
    const results = await db.collection('Users').find({Verify: false, Key: key}).toArray()
    //verify data from database
    if(results.length == 0)
    {
      var r = {error: 'ERROR: invalid key provided'};
      res.status(200).json(r);
      return;
    }
    
    //check if token is good
    var jwtToken = key;
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
    //accept user
    try
    {
      //user_ret = await db.collection("Users").aggregate(pipeline).toArray();
      await db.collection("Users").updateOne({Key: key}, {$unset:{createdAt: "", Key: ""}, $set :{Verify: true}});
    }
    catch(e)
    {
      var r = {error: 'ERROR: ' + e};
      res.status(200).json(r);
      return;
    }
    
    let verified = "email is now verified";
    var ret = {message: verified};
    res.status(200).json(ret);
  }
  
  );
  
  //send email to reset password (this sends link on password reset)
  app.post('/api/email_password', async (req, res, next) =>{

    //IN - email
    const db = client.db()
    const results = await db.collection('Users').find({Email: req.body.email}).toArray()
    //if email not in database or user not validated
    if(results.length == 0 || !results[0].Verify){
      var r = {error: 'Invalid email provided'};
      res.status(200).json(r);
      return;
    }

    var FirstName = results[0].FirstName;
    var LastName = results[0].LastName;
    var id = results[0]._id;
    //console.log(id);

    const token = require('./createJWT.js');
    var ret = token.createToken(FirstName, LastName);
    const results_password = await db.collection('PasswordReset').find({QueryID: id}).toArray()

    //user already has password reset request
    if(results_password.length > 0){
      var r = {error: 'User already has password reset request'};
      res.status(200).json(r);
      return;
    }

    //register that user has requested password reset
    //await db.collection('PasswordReset').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 1800 } )
    await db.collection('PasswordReset').insertOne({createdAt: (new Date()), QueryID: id, Key: ret.accessToken})

    //in production or not in production
    var mes;
    var route = 'reset-password?key=';
    if (process.env.NODE_ENV === 'production') 
    {
      mes = 'https://cinema-guesser.herokuapp.com/' + route;
    }
    else
    {        
      mes = 'http://localhost:3000/' + route;
    }

    console.log(mes + ret.accessToken);
    console.log(req.body.email);
    let link = '<body>Click <a href="'+ mes + ret.accessToken+ '">here</a> to reset your password.</body>'
    const msg = {
      to: req.body.email,
      from: 'cinemaguesser.devteam@gmail.com',
      subject: 'Email Verification Needed',
      text: 'Please click this link to confirm your email',
      html: link,
    };
    
    sgMail.send(msg)
    .then(()=>{
      console.log('Email sent')
    })
    .catch((error) => {
      console.log(error)
    })
    var ret = {message: "password reset request has been sent"};
    res.status(200).json(ret);
  });

  //specifically from reset password
  app.post('/api/update_password', async (req, res, next) =>{
    //IN - key, password

    const db = client.db();
    //prepare password
    //hash password if it exists
    var password = req.body.password;
    if(password && typeof(password) === 'string'){
      password = sha256.hmac('key', password);
    }

    const results = await db.collection('PasswordReset').find({Key: req.body.key}).toArray()

    //user already has password reset request
    if(results.length == 0){
      var r = {error: 'ERROR: no password reset request'};
      res.status(200).json(r);
      return;
    }

    //update info
    try{
      var obj = {'$set': {Password: password}};
      await db.collection('Users').updateOne({_id:results[0].QueryID}, obj);
      //delete from PasswordReset
      await db.collection('PasswordReset').deleteOne({ Key: req.body.key });
    }
    catch(e)
    {
      var r = {error: 'ERROR: ' + e};
      res.status(200).json(r);
      return;
    }
    var ret = {message: "password has been reset!"};
    res.status(200).json(ret);
  });
//-----------------------------------WATCHLIST ENDPOINTS-----------------------------------
  require('./watchListAPI')(app, client);
//-----------------------------------MOVIE ENDPOINTS-----------------------------------
  require('./movieAPI')(app, client);
}