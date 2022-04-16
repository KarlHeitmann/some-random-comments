const https = require('http');

const handlers = {};

handlers.upvote = function(data, callback) {
  console.log("data", data)
  console.log("data.queryStringObject", data.queryStringObject.key)
  callback(200, {count: Math.floor(Math.random() * 100)});
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
}

module.exports = router