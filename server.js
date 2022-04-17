const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors())


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
  "key": Number
});

const Comment = new mongoose.model('Comment', commentSchema);

app.get('/', async (req, res) => {
  const comments = await Comment.find();
  console.log(comments)
  console.log("asddsa")
  res.send({comments});
});

app.post('/comment', async (req, res) => {
  const comments = [];
  console.log("req.body", req.body)
  console.log("new comment")
  res.send({comments});
});

app.post('/reply', async (req, res) => {
  const comments = await Comment.find();
  console.log(comments)
  console.log("reply")
  res.send({comments});
});

app.get('/upvote', async (req, res) => {
  const comments = await Comment.find();
  console.log(comments)
  console.log("asddsa")
  res.send({comments});
});

console.log("process.env", process.env)
console.log("process.env.PORT", process.env.PORT)
const PORT = process.env.PORT || 3001;
console.log("::::::::::::: PORT, ", PORT)
app.listen(PORT);
