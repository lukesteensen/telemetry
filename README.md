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

[1]: http://beagleboard.org/bone
[2]: http://192.168.1.101:8080
[3]: http://i.imgur.com/yOSW3.pngWiTOe
[4]: http://i.imgur.com/WiTOe.png
[5]: http://i.imgur.com/YLtiS.png
