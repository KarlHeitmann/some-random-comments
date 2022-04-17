const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const { comment } = require('./backend/handlers');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const commentSchema = new mongoose.Schema({
  "content": String,
  "avatar": String,
  "votes": Number,
  "date": String,
  "key": Number,
  "parent_comment": String
});

const Comment = new mongoose.model('Comment', commentSchema);

app.get('/', async (req, res) => {

  const {id} = req.query
  const comments = await Comment.find({parent_comment: id});
  if (id != null) {
    console.log(id, comments)
  } else {
    console.log(comments)
    console.log("asddsa")

  }
  res.send({comments});
});

app.post('/comment', async (req, res) => {
  const comments = [];
  const {id} = req.query
  const comment = new Comment({
    content: req.body.content,
    avatar: Math.floor(Math.random() * 500),
    votes: 0,
    date: new Date(),
    key: Math.floor(Math.random() * 1000),
    parent_comment: id,
  })
  comment.save()
  console.log(comment)

  console.log("req.body", req.body)
  console.log("new comment")
  res.send({comment});
});

app.post('/reply', async (req, res) => {
  const {id} = req.query
  const comments = await Comment.find();
  const comment = new Comment({
    content: req.body.content,
    avatar: Math.floor(Math.random() * 500),
    votes: 0,
    date: new Date(),
    key: Math.floor(Math.random() * 1000),
    parent_comment: id
  })
  comment.save
  console.log(comments)
  console.log("reply")
  res.send({comment});
});

app.post('/upvote', async (req, res) => {
  const {id} = req.query
  // const comment = await Comment.find({_id: id});
  const comment = await Comment.findById(id);
  console.log(comment)
  comment.votes += 1
  comment.save()
  console.log("upvote", req.query.id)
  res.send({comment});
});

console.log("process.env", process.env)
console.log("process.env.PORT", process.env.PORT)
const PORT = process.env.PORT || 3001;
console.log("::::::::::::: PORT, ", PORT)
app.listen(PORT);
