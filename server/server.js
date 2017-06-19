const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//create a new account
app.post('/users', (req, res)=>{

  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
      res.status(400).send(e);
    })

});

//logout
app.delete('/users/me/token', authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, ()=>{
    res.status(400).send();
  })

});

//login
app.post('/users/login', (req, res)=>{

  var credentials = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(credentials.email, credentials.password).then((user)=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.get('/user/me', authenticate, (req, res)=>{
  res.send(req.user);
});

//create a new todo
app.post('/todos', authenticate, (req, res)=>{
  console.log({req});
  var todo = new Todo({
    _creator: req.user._id,
    text: req.body.text
  });

  todo.save().then(
    (doc) => {res.send(doc);},
    (e) => {res.status(400).send(e);}
  );

});

//get an existing todo
app.get('/todos', authenticate, (req, res) => {
console.log(req.user._id);
  Todo.find({
    _creator: req.user._id
  }).then(
    (todos) => {res.send({todos});
  },
    (e)=>{resp.status(400).send(e);
  });

});

//get a specific todo
app.get('/todos/:id', authenticate, (req, res) => {

  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    console.log('invalid id');
    return res.status(404).send();
  };

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {

    if (!todo) {
      return res.status(404).send({text:'todo not found'});
    }

    res.send({todo});

  }).catch((e)=> {
    res.status(400).send({text:'!!'});
  });

});

//delete a specific todo
app.delete('/todos/:id', authenticate, (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({text: 'Id invalid'});
  };

  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{

    if(!todo) {
      return res.status(404).send({text: 'No todo found'})
    }

    res.send({todo});

  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req, res) =>{

  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({text: 'Id invalid'});
  };

  if(_.isBoolean(body.completed) && true) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then((todo)=>{
    if (!todo) {
      return res.status(404).send({text:'todo to modified not found'});
    };
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started at ${port}`);
});

module.exports = {app};
