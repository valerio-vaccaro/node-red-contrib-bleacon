/**
 * scanBeacon.js
 * Scans for a iBeacons
 * Countinuously returns the found beacosn
 * Requires Bleacon: https://github.com/sandeepmistry/node-bleacon
 * Copyright 2015 Valerio Vaccaro - www.valeriovaccaro.it
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
  var Bleacon = require('bleacon');

  function BeaconScan(n) {
    RED.nodes.createNode(this, n);

    var msg = {};
    var beacon_uuid;
    var beacon_major;
    var beacon_minor;
    var node = this;

    // Get varables from the node
    this.beacon_uuid = n.beacon_uuid;
    this.beacon_major = n.beacon_major;
    this.beacon_minor = n.beacon_minor;

    // Status icon
    this.status({
      fill: "grey",
      shape: "dot",
      text: "not scanning"
    });

    this.on("input", function(msg) {
      if (msg.payload == "on" || msg.payload == 1) {
        if ((this.beacon_uuid != "") && (this.beacon_major != "") && (
            this.beacon_minor !=
            "")) {
          try {
            Bleacon.startScanning(this.beacon_uuid, this.beacon_major,
              this.beacon_minor);
            this.status({
              fill: "blue",
              shape: "dot",
              text: "scanning"
            });
          } catch (err) {
            console.log(err);
          }
        } else if ((this.beacon_uuid != "") && (this.beacon_major != "")) {
          try {
            Bleacon.startScanning(this.beacon_uuid, this.beacon_major);
            this.status({
              fill: "blue",
              shape: "dot",
              text: "scanning"
            });;
          } catch (err) {
            console.log(err);
          }
        } else if (this.beacon_uuid != "") {
          try {
            Bleacon.startScanning(this.beacon_uuid);
            this.status({
              fill: "blue",
              shape: "dot",
              text: "scanning"
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            Bleacon.startScanning();
            this.status({
              fill: "blue",
              shape: "dot",
              text: "scanning"
            });
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        try {
          Bleacon.stopScanning();
          this.status({
            fill: "grey",
            shape: "dot",
            text: "not scanning"
          });
        } catch (err) {
          console.log(err);
        }
      }
    });

    Bleacon.on('discover', function(bleacon) {
      msg = {};
      msg.topic = node.topic;
      msg.payload = JSON.stringify(bleacon);
      node.send(msg);
    });


    this.on("close", function() {
      try {
        Bleacon.stopScanning();
      } catch (err) {
        console.log(err);
      }
    });
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType("scanBeacon", BeaconScan);
}
