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

import {createOrUpdateDnsRecord} from "./cloudflare";
import {getExternalIp} from "./ip";
import {IOptions, Options} from "./options";

/**
 * Updates the specified CloudFlare DNS record with an IP address, creating it
 * if it does not exist.
 *
 * @param options The options associated with the update request.
 * @param callback Callback function called with any error that occurred as
 *                 well as the new IP address if the request succeeded.
 */
export function update(options: IOptions,
                       callback: (err?: Error, newIp?: string,
                                  recordName?: string, zoneName?: string) => void): void {
    const {auth, ip, recordName, zoneName} = new Options(options);

    if (ip) {
        createOrUpdateDnsRecord(auth, ip, recordName, zoneName, (error) => {
            if (error) {
                callback(error);
                return;
            }
            callback(undefined, ip, recordName, zoneName);
        });
    } else {
        getExternalIp((error, externalIp) => {
            if (error || !externalIp) {
                callback(error || new Error("Unknown error"));
                return;
            }
            createOrUpdateDnsRecord(auth, externalIp, recordName, zoneName,
                                    (error2) => {
                                        if (error2) {
                                            callback(error2);
                                            return;
                                        }
                                        callback(undefined, externalIp, recordName, zoneName);
                                    });
        });
    }
}
