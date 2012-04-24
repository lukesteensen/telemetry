// parsers
var parseTemp = function(str) {
    return (((parseInt(str, 16) / 50 - 273.15) * 1.8 + 32).toFixed(2));
};

// sensors
this.sensors = [
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
    },
    {
        name: 'rear-driver-tire-temp',
        // cmd:    "i2cget -y 3 0x5a 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'rear-driver-ambient-temp',
        // cmd:    "i2cget -y 3 0x5a 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'rear-passenger-tire-temp',
        // cmd:    "i2cget -y 3 0x5b 0x07 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    },
    {
        name: 'rear-passenger-ambient-temp',
        // cmd:    "i2cget -y 3 0x5b 0x06 w",
        cmd:    'echo $RANDOM',
        parser: parseTemp,
        units:  " degrees F"
    }
];

