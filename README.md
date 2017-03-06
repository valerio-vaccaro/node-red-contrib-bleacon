# node-red-contrib-bleacon
A collection of [Node-RED](http://nodered.org) nodes to read and emulate iBeacon tags with on board Bluetooth 4.0 radio or by using a cheap Bluetooth 4.0 USB adapter.

## Install
Use npm to command to install this package locally in the Node-RED modules directory
```bash
npm install node-red-contrib-bleacon
```
or install in it globally with the command
```bash
npm install node-red-contrib-bleacon -g
```

## Nodes included in the package
**scanBeacon** Scan for the presence of one or more iBeacons, you can filter by UUID, Major and Minor.

**emulateBeacon** Emulate thepresence of one custom iBeacons, you can choose UUID, Major, Minor and power .

## Usage example
![Basic usage](https://github.com/valerio-vaccaro/node-red-contrib-bleacon/blob/master/node-red-contrib-bleacon_example.png)
Simple usage of the plugin in Node-RED, a message with ON or 1 will turn on the node, otherwise a message with OFF or 0 will turn off the node.
```json
[
    {
        "id": "91e8f20d.6e171",
        "type": "inject",
        "name": "",
        "topic": "",
        "payload": "on",
        "payloadType": "string",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 134,
        "y": 330,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "7338fd2e.8cc704"
            ]
        ]
    },
    {
        "id": "396da0a5.c6926",
        "type": "inject",
        "name": "",
        "topic": "",
        "payload": "off",
        "payloadType": "string",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 136,
        "y": 378,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "7338fd2e.8cc704"
            ]
        ]
    },
    {
        "id": "a2fa3c37.5d05c",
        "type": "json",
        "name": "",
        "x": 452,
        "y": 360,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "6fb47cbf.904b84"
            ]
        ]
    },
    {
        "id": "7338fd2e.8cc704",
        "type": "scanBeacon",
        "name": "",
        "beacon_uuid": "",
        "beacon_major": "",
        "beacon_minor": "",
        "x": 291,
        "y": 358,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "a2fa3c37.5d05c"
            ]
        ]
    },
    {
        "id": "fee6d9d5.011928",
        "type": "inject",
        "name": "",
        "topic": "",
        "payload": "on",
        "payloadType": "string",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 132,
        "y": 459,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "5d7401ac.a28c"
            ]
        ]
    },
    {
        "id": "8a86b72e.757948",
        "type": "inject",
        "name": "",
        "topic": "",
        "payload": "off",
        "payloadType": "string",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 134,
        "y": 507,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "5d7401ac.a28c"
            ]
        ]
    },
    {
        "id": "6fb47cbf.904b84",
        "type": "debug",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 559,
        "y": 483,
        "z": "db8c5543.2473a8",
        "wires": []
    },
    {
        "id": "5d7401ac.a28c",
        "type": "emulateBeacon",
        "name": "",
        "beacon_uuid": "e2c56db5dffb48d2b060d0f5a71096e0",
        "beacon_major": "",
        "beacon_minor": "",
        "beacon_power": "-59",
        "x": 307,
        "y": 487,
        "z": "db8c5543.2473a8",
        "wires": [
            [
                "6fb47cbf.904b84"
            ]
        ]
    }
]
```

## Tested devices

| Vendor                                               | ID        | Working | Note                                                 |
|------------------------------------------------------|-----------|---------|------------------------------------------------------|
| Cambridge Silicon Radio, Ltd Bluetooth Dongle        | 0a12:0001 | YES     |                                                      |

Tried on another device??? Let me know ;)

## History
- 0.0.4 - March 2017 : Solved some minor warnings
- 0.0.3 - July 2015 : Solved error on emulation node exit
- 0.0.2 - June 2015 : Minor bugfixes
- 0.0.1 - April 2015 : Initial Release

## Authors
* Valerio Vaccaro (https://github.com/valerio-vaccaro)

## Credits
Node-RED has been made possible by the hard work of Nick O'Leary @knolleary and Dave Conway-Jones @ceejay at IBM Emerging Technology. Much thanks to them and other supporters for advancing this platform.
These nodes use the Sandeep Mistry @sandeepmistry library Bleacon, thanks for your work also.
This module is developed by Valerio Vaccaro (http://www.valeriovaccaro.it) on Raspberry Pi embedded board.

## License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
