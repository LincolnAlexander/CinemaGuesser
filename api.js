require('express');
require('mongodb');
const axios = require("axios");
const http = require('http');
exports.setApp = function ( app, client )
{
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
      const { login, password } = req.body;
    
      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    
      var id = -1;
      var fn = '';
      var ln = '';
    
      if( results.length > 0 )
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
      }
    
      var ret = { id:id, firstName:fn, lastName:ln, error:''};
      res.status(200).json(ret);
    });
    
    //Written by Casey
    app.post('/api/register', async (req, res, next) =>
    {
      var error = '';
      const{FirstName, LastName ,Login, Password} = req.body;
      const db = client.db();
      const results = await

      db.collection('Users').insertOne({FirstName, LastName, Login, Password});

      var ret = {firstname:FirstName, lastname: LastName, login: Login, password:Password};
      res.status(200).json(ret);
    });

    app.post('/api/movies', async (req, res, next) =>
    {
      var ret = await makeGetRequest(req.body.search);
      res.status(200).json(ret);
    });

    function makeGetRequest(search) {
      return new Promise(function (resolve, reject) {
          axios.get(`http://www.omdbapi.com/?${process.env.APIKEY}&`, {
            params : {
              //apikey: `${process.env.APIKEY}`,
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