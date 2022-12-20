const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MithunAj:TqZQxDDMNLfQgTiG@cluster0.per79te.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',function(error){
    console.log('There was an error opening the connection to DB',error)
});

db.once('open',function(){
    console.log('Successfully connected to DB')
});

module.exports = db;



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = 'mongodb+srv://MithunAj:TqZQxDDMNLfQgTiG@cluster0.per79te.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true};
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();

//   module.exports = client;
