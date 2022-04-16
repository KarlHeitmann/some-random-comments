const https = require('http');
const fs = require('fs')
const handlers = {};

const readCommentsFS = (file) => JSON.parse(fs.readFileSync(file))
const writeCommentsFS = (file, comments) => fs.writeFileSync(file, JSON.stringify(comments)) 

handlers.upvote = function(data, callback) {
  // console.log("data", data)
  const {key} = data.queryStringObject
  // console.log("data.queryStringObject", key)
  const comments = readCommentsFS('db.json')
  const comment = comments.find(comment => comment.key == key)
  const i = comments.findIndex(comment => comment.key == key)
  comment.votes = comment.votes + 1
  comments[i] = comment
  writeCommentsFS('db.json', comments)

  callback(200, comment);
}

handlers.comments = function(data, callback) {
  // const comments = readCommentsFS('seeds.json')
  const comments = readCommentsFS('db.json')
  writeCommentsFS('db.json', comments)
  callback(200, {comments})
}

handlers.comment = function(data, callback) {
  const comments = readCommentsFS('db.json')
  const last_comment = comments[comments.length - 1]
  const last_key = last_comment.key + 1
  const random_ph = Math.floor(Math.random() * 5)
  const comment = {
    // content: 'asd', // GOOD
    content: data.payload, // ??
    avatar: `person_ph_${random_ph}`,
    // votes: Math.floor(Math.random * 10),
    votes: 0,
    // date: new Date(2022, Math.floor(Math.random() * 3), Math.floor(Math.random())),
    date: new Date,
    key: last_key
  }
  comments.push(comment)
  writeCommentsFS('db.json', comments)
  callback(200, {comment: comment})
}

handlers.sample = function(data, callback) {
  // Callback a http status code, and a payload object
  // callback(406, {'name': 'sample handler'});
  
  const options = {
    'method': 'GET',
    'hostname': 'loripsum.net',
    'path': '/api',
    'headers': {
    },
    'maxRedirects': 20
  };

  const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      const body = Buffer.concat(chunks);
      const comments = body.toString().split("\n\n").map((comment, index) => {
        return {
          content: comment,
          avatar: `person_ph_${Math.floor(Math.random() * 4 + 1)}`,
          votes: Math.floor(Math.random() * 10),
          date: new Date(2022, Math.floor(Math.random() * 3), Math.floor(Math.random())),
          key: index,
        }
      });
      console.log("comments", comments);
      callback(200, {comments});
    });

    res.on("error", function (error) {
      console.error(error);

    });
  });

  req.end();
  // callback(200, {'name': 'sample handler'});
};


// Define a request router
const router = {
  'sample': handlers.sample,
  'upvote': handlers.upvote,
  'comments': handlers.comments,
  'comment': handlers.comment,
}

module.exports = router
