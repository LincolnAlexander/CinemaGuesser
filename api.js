require('express');
require('mongodb');
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

      db.collection('Users').insertOne({FirstName, LastName, login, password});

      var ret = {firstname:FirstName, lastname: LastName, login: login, password:password};
      res.status(200).json(ret);
    });
    
}