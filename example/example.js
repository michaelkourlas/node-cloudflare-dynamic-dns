/**
 * Copyright (C) 2014-2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var ddns = require("../lib/main");

/**
 * This example demonstrates the most common use of cloudflare-dynamic-dns,
 * which updates a CloudFlare DNS record with the external IP address of the
 * machine on which the module is running, as determined by the
 * myexternalip.com API.
 */
var example1 = function() {
    var options = {
        auth: {
            email: "<email>",
            key: "<key>"
        },
        recordName: "galileo.kourlas.com",
        zoneName: "kourlas.com"
    };
    ddns.update(options, function(err, newIp) {
        if (err) {
            console.log("An error occurred:");
            console.log(err);
        } else {
            console.log("Successfully changed IP to " + newIp + "!");
        }
    });
};
example1();

/**
 * This example demonstrates the use of cloudflare-dynamic-dns with a manually
 * specified IP address.
 */
var example2 = function() {
    var options = {
        auth: {
            email: "<email>",
            key: "<key>"
        },
        ip: "93.184.216.34",
        recordName: "galileo.kourlas.com",
        zoneName: "kourlas.com"
    };
    ddns.update(options, function(err, newIp) {
        if (err) {
            console.log("An error occurred:");
            console.log(err);
        } else {
            console.log("Successfully changed IP to " + newIp + "!");
        }
    });
};
example2();
