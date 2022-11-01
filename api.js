require('express');
require('mongodb');
const axios = require("axios");
const https = require('https');
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
      /*var search = req.body.search;
      console.log(search);
      axios
      .get('http://www.omdbapi.com/', {
        params : {
          t: search,
          apikey: process.env.APIKEY
        }
      })
      .then(response => {
        console.log(response.data);
        var ret = response.data;
        res.status(200).json(ret);
      })
      .catch(error => {
        console.log(error);
      });*/
      axios({
        method: 'get',
        baseURL: 'http://www.omdbapi.com/',
        params: {
          t: req.body.search,
          apikey: process.env.APIKEY
        }
      }).then(response => {
        var ret = response.data;
        res.status(200).json(ret);
      })
      .catch(error => {
        console.log(error)
      });
    });
    
}