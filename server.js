// requires
var http = require('http'),
    exec = require('child_process').exec,
    stat = require('node-static'),
    faye = require('faye');

// parsers
var parseTemp = function(str) {
    return (((parseInt(str, 16) / 50 - 273.15) * 1.8 + 32).toFixed(2));
};

// sensors
var sensors = [
    {
        name: 'front-driver-tire-temp',
        // cmd:    "i2cget -y 3 0x5a 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'front-driver-ambient-temp',
        // cmd:    "i2cget -y 3 0x5a 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'front-passenger-tire-temp',
        // cmd:    "i2cget -y 3 0x5b 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'front-passenger-ambient-temp',
        // cmd:    "i2cget -y 3 0x5b 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    }
];


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

