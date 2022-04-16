const http = require('http');
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./handlers');

function notFound(data, callback) {
  callback(404);
}

const httpServer = http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();

  const headers = req.headers;

  const decoder = new StringDecoder('utf-8')
  let buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data)
  })

  req.on('end', async function() {
    buffer += decoder.end()

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : notFound;

    const data = {
      trimmedPath: trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    await chosenHandler(data, function(statusCode, payload) {
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      payload = typeof(payload) == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);
      // const payloadString = "asddsa\n";
      // console.log(res)
      res.setHeader('Content-Type', 'application/json')
      // res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log("payloadString", payloadString)

      console.log('Returning this response: ', statusCode, payloadString)
    })
  })
  
});

httpServer.listen(3000, function() {
  console.log(`The server is listening on port 3000`)
});


