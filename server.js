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
        label:  "ObjectA temp:  ",
        // cmd:    "i2cget -y 3 0x5a 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        label:  "AmbientA temp: ",
        // cmd:    "i2cget -y 3 0x5a 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        label:  "ObjectB temp:  ",
        // cmd:    "i2cget -y 3 0x5b 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        label:  "AmbientB temp: ",
        // cmd:    "i2cget -y 3 0x5b 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    }
];


// static file server to serve the /public folder
var fileServer = new stat.Server('./public');

// the main server
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  });
}).listen(8080);

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

console.log('Server running on port 8080');
