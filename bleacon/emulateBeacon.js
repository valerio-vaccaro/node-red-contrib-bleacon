/**
 * emulateBeacon.js
 * Emulate an iBeacons
 * Countinuously emulate a beacon
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

var RED = require(process.env.NODE_RED_HOME+"/red/red");

var Bleacon = require('bleacon');

function BeaconScan(n) {
    RED.nodes.createNode(this,n);

    var msg = {};
    var beacon_uuid;
	var beacon_major;
	var beacon_minor;
    var beacon_power
    var node = this;

    // Get varables from the node
    this.beacon_uuid = n.beacon_uuid;
    this.beacon_major = n.beacon_major;
	this.beacon_minor = n.beacon_minor;
    this.beacon_power = n.beacon_power;
    
    // Status icon
    this.status({fill:"grey",shape:"dot",text:"not sending"});

    this.on("input", function(msg){ 
		if(msg.payload=="on" || msg.payload==1){
			if((this.beacon_uuid!="")&&(this.beacon_major!="")&&(this.beacon_minor!="")&&(this.beacon_power!="")){
				try { 
                    Bleacon.startAdvertising(this.beacon_uuid, this.beacon_major, this.beacon_minor, this.beacon_power);
                    this.status({fill:"blue",shape:"dot",text:"sending"});
                }
			    catch (err) { console.log(err); }    
			}
		}
		else{
			try { 
                Bleacon.stopAdvertising(); 
                this.status({fill:"grey",shape:"dot",text:"not sending"});
            }
			catch (err) { console.log(err); }
		}
    });

    this.on("close", function() {
        try { Bleacon.stopAdvertising(); }
        catch (err) { console.log(err); }
    });
}

// Register the node by name. This must be called before overriding any of the
// Node functions.
RED.nodes.registerType("emulateBeacon", BeaconScan);
