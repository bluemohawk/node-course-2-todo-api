// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const { } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('Unable to connect');
  }
  console.log('Connected');

  // db.collection('Todos').find({
  //   _id:new ObjectID('5940fc3bae8c250911239731')
  // }).toArray().then((docs)=>{
  //   if (err) {
  //     return console.log('there was an error', err);
  //   };
  //   console.log(JSON.stringify(docs, undefined, 2));
  // });

  db.collection('Users').find({name: "Francois"}).toArray().then((docs)=>{
    if (err) {
      return console.log('there was an error', err);
    };
    console.log(docs.length);
    console.log(JSON.stringify(docs, undefined, 2));
  });

  // db.close();

});
