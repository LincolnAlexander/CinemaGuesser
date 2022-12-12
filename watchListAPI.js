require('mongodb');

module.exports = function ( app, client ){
//-----------------------------------WATCHLIST ENDPOINTS-----------------------------------
    //if movie in watchlist delete it, if it's not in watchlist add it
    app.post('/api/watchlist_toggle', async (req, res, next) =>{               //watchlist_toggle
        //IN - login, title

        //input error checks
        if(!req.body.login || !req.body.title)
        {
            var r = {error: 'ERROR: empty field(s)'};
            res.status(200).json(r);
            return;
        }

        const db = client.db();
        let msg = '';
        let op = 0;

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
        
        //delete if it's in watchlist
        if(cursor[0].WatchList.includes(movie[0].Title)){
            //remove from WatchList
            try{
                await db.collection('Users').updateOne({ Login: req.body.login },{ $pull: { WatchList: movie[0].Title } })
                msg = 'Removed movie from watchlist!'
                op = 0
            }
            catch(e){
                var r = {error: 'ERROR: ' + e};
                res.status(200).json(r);
                return;
            }
        }
        //add if it's not in watchlist
        else{
            //add to WatchList
            try{
                await db.collection('Users').updateOne({ Login: req.body.login },{ $push: { WatchList: movie[0].Title } })
                msg = 'Added movie to watchlist!'
                op = 1
            }
            catch(e){
                var r = {error: 'ERROR: ' + e};
                res.status(200).json(r);
                return;
            }
        } 
        
        let ret = {message: msg, title: movie[0].Title, op: op}
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
        //IN - login, (optional) page, (optional) per_page,(optional) search
        var{login, page, per_page, search} = req.body;
        //input error checks
        if(typeof login === 'undefined')
        {
            var r = {error: 'ERROR: empty field(s)'};
            res.status(200).json(r);
            return;
        }

        if(typeof search === 'undefined')
            search = ""

        //default values (need to have both or none)
        if((typeof page !== 'undefined' && typeof per_page === 'undefined') || (typeof page === 'undefined' && typeof per_page !== 'undefined')){
            var r = {error: 'ERROR: need to have BOTH page and per_page OR NEITHER'};
            res.status(200).json(r);
            return;
        }
        
        //query
        const db = client.db();    

        var results;
        try{
            results = await db.collection('Users').
            find({Login: login}).
            project({ WatchList: 1, length: {$size: "$WatchList" }}).toArray();
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
        //parse watchlist
        let watchlist = results[0].WatchList;
        let regex = new RegExp("^"+search)
        let result_array = []
        for(let i = 0; i < watchlist.length; i++){
            if(regex.test(watchlist[i]))
                result_array.push(watchlist[i])
        }
        let length = result_array.length;

        //enforce page
        if(typeof page !== 'undefined' && typeof page !== 'undefined')
            result_array = result_array.slice(page * per_page, page * per_page + per_page)

        var r = {list: result_array, total_length: length};
        res.status(200).json(r);
    });
}