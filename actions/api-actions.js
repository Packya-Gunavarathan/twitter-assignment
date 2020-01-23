var mongoDbConn = require('./mongodb-adapter.js');

class apiActions {

    constructor(app) {
        this.app = app;
    }

    init(){
        const app = this.app;
        var collection = 'tweets',
            dbName = 'twitter-assignment',
            url = 'mongodb://172.31.23.173:27017';
        app.get('/tweetList',(req,res)=> {
            console.log('removeDocument');

            mongoDbConn.find(dbName,url,
                {query:{"descrioption" : {$regex : ".*+req.key+.*"}},sort:{_id:-1},limit:req.limit
                },collection,function (result) {
                    res.send(result)

                })


           /* mongoDbConn.insert('twitter-assignment', 'mongodb://localhost:27017',{
                    query:[{id:'packyaGuna', name: 'Packya Gunavarathan', descrioption:'I am an Engineer', tweet:'This is my first tweet.'}]
                }
                , collection, function(result){
                    console.log(result)
                })*/
        })

    }
}

module.exports = apiActions;
