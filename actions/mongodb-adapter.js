const MongoClient = require('mongodb').MongoClient;
var objectId=new require('mongodb').ObjectID;
const assert = require('assert');


// Connection URL
const url = 'mongodb://172.31.23.173:27017';
// Database Name
const dbName = 'twitter-assignment';


// Use following method  for database operation

const find=(dbName,url,data,coll,cbk) =>{
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const mongo = client.db(dbName);
        findDocuments(mongo,data,coll,function (cb) {
            cbk(cb);
            client.close();
        });

    });
}

const insert=(dbName,url,data,coll,cbk) =>{
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const mongo = client.db(dbName);
        insertDocuments(mongo,data,coll,function (cb) {
            cbk(cb);
            client.close();
        });

    });
}

const update=(dbName,url,data,coll,cbk) =>{
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const mongo = client.db(dbName);
        updateDocument(mongo,data,coll,function (cb) {
            cbk(cb);
            client.close();
        });

    });
}

const remove=(dbName,url,data,coll,cbk) =>{
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const mongo = client.db(dbName);
        removeDocument(mongo,data,coll,function (cb) {
            cbk(cb);
            client.close();
        });

    });
}




const insertDocuments = function(db,data,dbName, callback) {
    // Get the documents collection
    const collection = db.collection(dbName);
    // Insert some documents
    collection.insertMany(data.query, function(err, result) {

        console.log("Inserted documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, data,dbName,callback) {
    // Get the documents collection
    const collection = db.collection(dbName);
    // Find some documents
    collection.find(data.query).sort(data.sort).limit(data.limit).toArray(function(err, docs) {
        callback(docs);
    });
}

const updateDocument = function(db,data,dbName, callback) {
    // Get the documents collection
    const collection = db.collection(dbName);
    // Update document where a is 2, set b equal to 1
    collection.updateOne(data.query
        , data.condition, function(err, result) {

            console.log("updated");
            callback(result);
        });
}

const removeDocument = function(db,data,dbName, callback) {
    // Get the documents collection
    const collection = db.collection(dbName);
    // Update document where a is 2, set b equal to 1
    collection.deleteOne(data.query, function(err, result) {

        console.log("Deleted");
        callback(result);
    });
}




//example
const collection='documents'

insert(dbName,url,
    {
        query:[{test:1}]
    }
    ,collection,function (result) {
        console.log(result);

    })
update(dbName,url,
    {
        query:{test:1},
        condition:{$set:{test:'jh5'}
        }

    }
    ,collection,function (result) {
        console.log(result);

    })

remove(dbName,url,{query:{aaa:'v'}},collection,function (result) {
    console.log(result);

})

find(dbName,url,
    {query:{},sort:{_id:-1},limit:3

    },collection,function (result) {
        console.log(result);

    })

