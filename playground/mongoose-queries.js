const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// findById
// no user
// user found
//error

var id = '59412d7e07168485172da4be11';

User.findById(id).then((user)=>{
  if(!user) {
    return console.log('no user found');
  };
  console.log("User by id was", user);


}).catch((e)=>console.log(e));


// var id = '69414aa010d0c6840fdba6ec11';
// if (!ObjectID.isValid(id)) {
//   console.log("id not valid");
// }
//
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// // });
//
// Todo.findById(id).then((todo)=>{
//   if (!todo) {
//     return console.log("id not found");
//   };
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));
