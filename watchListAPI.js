require('mongodb');

module.exports = function ( app, client ){
//-----------------------------------WATCHLIST ENDPOINTS-----------------------------------
    app.post('/api/add_watchlist', async (req, res, next) =>{               //add_watchlist
        //IN - login, title

        //input error checks
        if(!req.body.login || !req.body.title)
        {
            var r = {error: 'ERROR: empty field(s)'};
            res.status(200).json(r);
            return;
        }

        const db = client.db();

        //to lower title for consistancy
        let title = req.body.title
        title = title.toLowerCase();
        
        const movie = await db.collection('Movies').find({Title: title}).toArray()

        if(movie.length == 0){
            var r = {error: 'ERROR: movie not found in Movies'};
            res.status(200).json(r);
            return;
        }

        //query for Watchlist
        //check if user exists and if title already in WatchList
        const cursor = await db.collection('Users').find({Login: req.body.login}).project({WatchList: 1}).toArray();

        if(cursor.length == 0){
            var r = {error: 'ERROR: invalid user provided'};
            res.status(200).json(r);
            return;
        }
        
        if(cursor[0].WatchList.includes(movie[0].Title)){
            var r = {error: 'ERROR: movie already in watchlist'};
            res.status(200).json(r);
            return;
        }

        //add to WatchList
        try{
            await db.collection('Users').updateOne({ Login: req.body.login },{ $push: { WatchList: movie[0].Title } })
        }
        catch(e){
            var r = {error: 'ERROR: ' + e};
            res.status(200).json(r);
            return;
        }
        
        let ret = {message: "Movie added!", title: movie[0].Title}
        res.status(200).json(ret);
    });
    
    app.post('/api/remove_watchlist', async (req, res, next) =>{            //remove_watchlist
        //IN - login, title

        //input error checks
        if(!req.body.login || !req.body.title)
        {
            var r = {error: 'ERROR: empty field(s)'};
            res.status(200).json(r);
            return;
        }

        //query
        const db = client.db();
 
        //remove from WatchList
        try{
            await db.collection('Users').updateOne({ Login: req.body.login },{ $pull: { WatchList: req.body.title } })
        }
        catch(e){
            var r = {error: 'ERROR: ' + e};
            res.status(200).json(r);
            return;
        }
        
        let ret = {message: "Movie deleted!", title: req.body.title}
        res.status(200).json(ret);
    });

    app.post('/api/get_watchlist', async (req, res, next) =>{               //get_watchlist
        //IN - login, page = 0, per_page = 10
        var{login, page, per_page} = req.body;
        //input error checks
        if(!login)
        {
            var r = {error: 'ERROR: empty field(s)'};
            res.status(200).json(r);
            return;
        }

        //default values
        if(!page)
            page = 0
        if(!per_page)
            per_page = 10
        
        //query
        const db = client.db();    

        const slice = [ page * per_page, page * per_page + per_page];
        console.log(slice + " " + page + " " + per_page);

        var results;
        try{
            results = await db.collection('Users').
            find({Login: login}).
            project({ WatchList: { $slice: slice }, length: {$size: "$WatchList" }}).toArray();
        }
        catch(e){
            var r = {error: 'ERROR: ' + e};
            res.status(200).json(r);
            return;
        }
        

        if(results.length == 0){
            var r = {error: 'ERROR: invalid user provided'};
            res.status(200).json(r);
            return;
        }
        var r = {list: results[0].WatchList, total_length: results[0].length};
        res.status(200).json(r);
    });
}