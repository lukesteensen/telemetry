// requires
var http = require('http'),
    exec = require('child_process').exec,
    stat = require('node-static'),
    sensors = require('./sensors').sensors,
    faye = require('faye');


// static file server to serve the /public folder
var fileServer = new stat.Server('./public');

// pubsub server to push out live data updates
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

// the main server
var server = http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  });
});

bayeux.attach(server);
server.listen(8080);

console.log('Server running on port 8080');

// get faye client to pubish messages to browser
var client = bayeux.getClient();

// loop forever over the sensors array, waiting between each iteration to avoid
// clogging the i2c bus and getting junk data
(function() {
  var i = 0;
  var get_data = function() {
    exec(sensors[i].cmd, function(error, stdout, stderr) {
      client.publish('/data', {
        name: sensors[i].name,
        value: sensors[i].parser(stdout),
        units: sensors[i].units,
        time: Date.now()
      });
      i = (i + 1) % sensors.length;
      setTimeout(get_data, 200);
    });
  };
  get_data();
})();

// old server code
// http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // var callbacks = 0;
    // sensors.forEach(function(s) {
        // callbacks += 1;
        // exec(s.cmd, function (error, stdout, stderr) {
            // res.write( s.label + s.parser(stdout) + s.units + '\n' );
            // callbacks -= 1;
            // if (callbacks === 0) {
                // res.end();
            // }
        // });
    // });
// }).listen(1337, '');

