/**
 * Copyright (C) 2019 Michael Kourlas
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

import {update} from "../src/main";

/**
 * This example demonstrates the most common use of cloudflare-dynamic-dns,
 * which updates a CloudFlare DNS record with the external IP address of the
 * machine on which the module is running, as determined by the
 * myexternalip.com API.
 */
const example1 = () => {
    const options = {
        auth: {
            email: "<email>",
            key: "<key>"
        },
        recordName: "foo.bar.com",
        zoneName: "bar.com"
    };
    update(options, (err, newIp) => {
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
const example2 = () => {
    const options = {
        auth: {
            email: "<email>",
            key: "<key>"
        },
        ip: "1.1.1.1",
        recordName: "foo.bar.com",
        zoneName: "bar.com"
    };
    update(options, (err, newIp) => {
        if (err) {
            console.log("An error occurred:");
            console.log(err);
        } else {
            console.log("Successfully changed IP to " + newIp + "!");
        }
    });
};
example2();
