# VU Motorsports Telemetry

This repository contains the software designed to run a wireless telemetry
system for the VU Motorsports team's formula car.

The hardware consists of a [BeagleBone][1] embedded Linux development board
connected to a wireless router and various sensors.

Currently, the only sensors fully implemented are IR temperature sensors for
measuring tire temperature, but the system has been designed to be easily
extensible. Instructions on adding sensors can be found later in this document.

## Getting Connected

*Before starting, the router should be powered up and the BeagleBone connected
via Ethernet to one of its four switch inputs.*

The first step is to power on the BeagleBone. This can be done either from the
labelled 5V power adapter or from the USB (mini B) port.

Once the green power LED lights up on the board, you know it is recieving power.
Soon afterwards, the green user LEDs on the opposite side of the Ethernet jack
should begin blinking, signaling that the board is in the boot process. The
board should boot within about one minute, so give it some time before
proceeding to the next step. 

From time to time, the board will show that it has power, but not boot correctly
(the user LEDs will not begin to blink) This is easily fixed by cycling power
while the small reset button next to the Ethernet jack is depressed. 

After booting successfully, the next step is to access the device via a terminal
(Terminal.app on OS X, for example). The router is configured to create
a wireless network with the SSID "telemetry" and give the BeagleBone the static
IP address of 192.168.1.101 on that network. Therefore, from a computer
connected to that wireless network, running the following terminal command:

    ssh root@192.168.1.101

and hitting `Enter` at the password prompt should successfully log you in to
the BeagleBone. 

## Running the server

Once you have console access, running the following command will start the
telemetry server:

    node server.js

Once the server is running, the telemetry dashboard should be accessible to any
computer connected to the telemetry wireless network by typing
"[192.168.1.101:8080][2]" into a web browser's address bar.

*Please note that an up-to-date version of Google Chrome is the recommended
browser to make sure that the page displays correctly.*

![Screenshot][3]

## Hardware Description

![Schematic][4]

Above is an abbreviated version of the current schematic. The wires at the
bottom continue to the other two attached temperature sensors and make up the
entirety of the I2C bus and power connections for the sensors. 

The connection to the BeagleBone is as shown below, with the yellow wire being
SCL and the green wire SDA:

![BeagleBone connection][5]

All of the pin definitions can be found in the official [BeagleBone System
Reference Manual][6].

### Sensors

The attached temperature sensors are [MLX90614][7] digital infrared
thermometers. Their datasheet can be found [here][8].

They speak I2C natively, so they simply need to be hooked up to 5V, ground, and
the two bus lines, each of which can be connected directly from the BeagleBone.
The SDA and SCL lines also require 4.7K pullup resistors, as shown in the
schematic. Below is their pinout:

![Temp sensor pinout][9]

One important thing to note is that each of the sensors came form the factory
with the same I2C slave address, so they had to be manually reprogrammed with
different addresses. When adding devices to the bus, it is important to check
their default addresses and make sure there is no current device on the bus with
that same address. The current sensors are 5a, 5b, 5c, and 5d, but there are
some system devices sharing the bus as well. 

## Software Description

The software running on the BeagleBone consists of an application software with
two distinct components, a static file server and a WebSocket publish/subscribe
server. 

The static file server is based off of the [node-static][10] module and handles
serving all of the files in the public folder, including the HTML, CSS, and
Javascipt files used to build the dashboard page. 

The publish/subscribe server is based on [Faye][11] and uses WebSockets to allow
pushing data in realtime to the web page. 

Our application server loops over the array of available sensors (described
next) at a given frequency, reading their values and publishing the data to over
the appropriate channel.

The client web page uses Javascript to subscribe to these data updates, adding
data to the relevant graphs in realtime, without any need to refresh in the
browser. The graphs are made with help from the [Smoothie.js][12] charting
library. 

## Adding sensors

Available sensors are defined in the sensors.js file. Each one has a name,
system command that returns the desired value, parser that parses the output of
the system command into the desired value, and a units suffix. 

The fact that the value comes from a system command means that sensors are very
loosely coupled from the server, so separate programs can be written and called
that gather the data, without ever adding anything to the server. 

All that needs to be added is the relevant sensor information, the appropriate
HTML in index.html to provide a cavas for drawing the graph, and the
declarations of the graph and timeseries in public/js/script.js. The existing
sensors should provide a very easy-to-follow template for any future sensors. 

## Parts List

* 1 BeagleBone
* 4 MLX90614 temp sensors
* 2 4.7K resistors

[1]: http://beagleboard.org/bone
[2]: http://192.168.1.101:8080
[3]: http://i.imgur.com/yOSW3.pngWiTOe
[4]: http://i.imgur.com/WiTOe.png
[5]: http://i.imgur.com/VBeMS.png
[6]: http://beagleboard.org/static/BONESRM_latest.pdf
[7]: http://www.melexis.com/Infrared-Thermometer-Sensors/Infrared-Thermometer-Sensors/MLX90614-615.aspx
[8]: http://www.melexis.com/Asset/IR-sensor-thermometer-MLX90614-Datasheet-DownloadLink-5152.aspx
[9]: http://i.imgur.com/7UIGf.png
[10]: https://github.com/cloudhead/node-static
[11]: http://faye.jcoglan.com/
[12]: http://smoothiecharts.org/

