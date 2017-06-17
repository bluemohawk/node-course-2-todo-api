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

//public route
app.post('/users', (req, res)=>{

  var body = _.pick(req.body, ['email', 'password', 'tokens']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
      res.status(400).send(e);
    })

});

app.get('/user/me', authenticate, (req, res)=>{
  res.send(req.user);
});

app.post('/todos', (req, res)=>{

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    (doc) => {res.send(doc);},
    (e) => {res.status(400).send(e);}
  );

});

app.get('/todos', (req, res) => {

  Todo.find().then(
    (todos) => {res.send({todos});
  },
    (e)=>{resp.status(400).send(e);
  });

});

app.get('/todos/:id', (req, res) => {

  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    console.log('invalid id');
    return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {

    if (!todo) {
      return res.status(404).send({text:'todo not found'});
    }

    res.send({todo});

  }).catch((e)=> {
    res.status(400).send({text:'!!'});
  });

});

app.delete('/todos/:id', (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({text: 'Id invalid'});
  };

  Todo.findByIdAndRemove(id).then((todo)=>{

    if(!todo) {
      return res.status(404).send({text: 'No todo found'})
    }

    res.send({todo});

  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) =>{

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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
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
