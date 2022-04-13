const handlers = {};

handlers.sample = function(data, callback) {
  // Callback a http status code, and a payload object
  // callback(406, {'name': 'sample handler'});
  callback(200, {'name': 'sample handler'});
};


// Define a request router
const router = {
  'sample': handlers.sample
}

module.exports = router
