const express = require('express');
const mongoose = require('mongoose');
const http = require("http")
const bodyParser = require("body-parser");
const cors = require('cors');
const { comment } = require('./backend/handlers');
const WebSocket = require('ws')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const mongo_uri = 'mongodb+srv://karl:<password>@cluster0.adqae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongo_uri = 'mongodb+srv://tryghost:tryghost@cluster0.adqae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const mongo_uri = 'mongodb://localhost/mern'
mongoose.connect(
  process.env.MONGODB_URI || mongo_uri,
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
  console.log("asddsa")
  const comments = await Comment.find({parent_comment: id});
  console.log(comments)
  if (id != null) {
    // console.log(id, comments)
  } else {
    // console.log(comments)
    // console.log("asddsa")

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
  // console.log(comment)

  // console.log("req.body", req.body)
  // console.log("new comment")
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
  // console.log(comments)
  // console.log("reply")
  res.send({comment});
});

app.post('/upvote', async (req, res) => {
  const {id} = req.query
  // const comment = await Comment.find({_id: id});
  const comment = await Comment.findById(id);
  // console.log(comment)
  comment.votes += 1
  comment.save()
  
  // console.log("upvote", req.query.id)
  res.send({comment});
});

const server = http.createServer(app)
const websocketServer = new WebSocket.Server({server})

//when a websocket connection is established // BORROWED FROM HERE: https://dev.to/ksankar/websockets-with-react-express-part-2-4n9f
websocketServer.on('connection', (webSocketClient, incoming_request) => {
  //send feedback to the incoming connection
  // console.log(webSocketClient)
  console.log(typeof(incoming_request.url), incoming_request.url)
  webSocketClient.send('{ "connection" : "ok"}');
  setInterval(async () => {
    // const data_to_send = JSON.stringify({"msg": "vamooosss"})
    const comments = await Comment.find({parent_comment: null})
    // console.log(comments)
    const data_to_send = JSON.stringify({
      "comments": comments
    })
    webSocketClient.send(data_to_send)

  }, 1000);
  
  //when a message is received
  webSocketClient.on('message', (message) => {

      //for each websocket client
      websocketServer
      .clients
      .forEach( client => {
          //send the client the current message
          client.send(`{ "message" : ${message} }`);
      });
  });
});


// console.log("process.env", process.env)
console.log("process.env.PORT", process.env.PORT)
const PORT = process.env.PORT || 3001;
console.log("::::::::::::: PORT, ", PORT)
// console.log("setupWebSocket", setupWebSocket)
server.listen(PORT);
