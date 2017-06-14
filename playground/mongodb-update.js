// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const { } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('Unable to connect');
  }
  console.log('Connected');

//findOneAndUpdate

// db.collection('Todos').findOneAndUpdate(
//   {_id: new ObjectID("5940fc3bae8c250911239731")},
//   {$set: {completed: true}},
//   {returnOriginal: false}
// ).then((results)=>{
//   console.log(results);
// });

db.collection('Users').findOneAndUpdate(
  {_id: new ObjectID("5940fe2aeeeef409211d6cb9")},
  {
    $set: {name: "Lapin"},
    $inc: {age:-1}
  },
  {returnOriginal: false}
).then((results)=>{
  console.log(results);
});


  // db.close();

});
