// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const { } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('Unable to connect');
  }
  console.log('Connected');

//delete many
// db.collection('Todos').deleteMany({text:"Eat lunch"}).then((results)=>{
//   console.log(results);
// });
//delete one
// db.collection('Todos').deleteOne({text:"Eat lunch"}).then((results)=>{
//   console.log(results);
// });
//findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed:true}).then((results)=>{
//   console.log(results);
// });
db.collection('Users').deleteMany({name:"Lapin"}).then((results)=>{
  console.log(results);
});

db.collection('Users').findOneAndDelete({_id:new ObjectID("5940fcdffef95b091ae74932")}).then((results)=>{
  console.log(results);
});

  // db.close();

});
