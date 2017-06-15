const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: '5942700aaecfed1e10d6200f'}).then((todo)=>{
//   console.log(todo);
// });

// Todo.findByIdAndRemove('59414aa010d0c6840fdba6ec').then((todo)=>{
//   console.log(todo);
// });
