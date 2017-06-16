const _ = require('lodash');
const express = require('express');
const bodyParser = require('Body-Parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.patch('/todos/:id', (req, res)=>{

  var id = req.params.id;
  var body = _pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(boby.completed) && true) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send({text:'todo to modified not found'});
    };
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send(e);
  });
});

app.delete('/todos/:id', (req, res)=>{

  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{

    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e)=>{
    res.status(400).send();
  })
});

app.get('/todos/:id', (req, res)=>{

  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{

    if(!todo) {
      res.status(404).send();
    } else {

      res.send({todo});
    }
  }).catch((e)=>{
    res.status(404).send();
  })
});

app.get('/todos', (req, res)=>{

  Todo.find().then((todos)=>{
    res.send({todos})
  }, (e)=> {
    res.status(400).send(e);
  });
});

app.post('/todo', (req, res)=>{

  var newTodo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(404).send();
  });

});

app.listen(port, ()=>{
  console.log(`started listening at ${port}`);
});

module.exports = {app};
