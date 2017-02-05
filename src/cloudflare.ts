/**
 * Copyright (C) 2016 Michael Kourlas
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

import {ApiError} from "./error";
import {Auth} from "./options";
import {httpsRequest} from "./request";
import {isArray, isString} from "./utils";

/**
 * @private
 */
const BASE_URL = "https://api.cloudflare.com/client/v4";

/**
 * Creates or updates a CloudFlare DNS record, depending on whether it already
 * exists. An error is returned if there are multiple DNS records for the
 * specified record name.
 *
 * @param auth CloudFlare API authentication information.
 * @param ip The IP to update the record with.
 * @param recordName The name of the record.
 * @param zoneName The name of the zone.
 * @param callback Callback function called with any error that occurred.
 *
 * @private
 */
export function createOrUpdateDnsRecord(auth: Auth, ip: string,
                                        recordName: string,
                                        zoneName: string,
                                        callback: (error?: Error) => void): void
{
    getZoneId(zoneName, auth, (error, zoneId) => {
        if (error || !zoneId) {
            callback(error || new Error("Unknown error"));
            return;
        }
        getDnsRecordId(zoneId, recordName, auth, (error2, dnsRecordId) => {
            if (error2) {
                callback(error2);
                return;
            }

            if (dnsRecordId) {
                updateDnsRecord(zoneId, dnsRecordId, ip, auth,
                                (error3?: Error) => {
                                    callback(error3);
                                });
            } else {
                createDnsRecord(zoneId, recordName, ip, auth,
                                (error3?: Error) => {
                                    callback(error3);
                                });
            }
        });
    });
}

/**
 * Gets the specified DNS record from CloudFlare. This function is only used
 * for testing this module.
 *
 * @param auth CloudFlare API authentication information.
 * @param recordName The name of the record.
 * @param zoneName The name of the zone.
 * @param callback Callback function called with any error that occurred as
 *                 well as the ID of the record retrieved.
 *
 * @private
 */
export function getDnsRecord(auth: Auth, recordName: string, zoneName: string,
                             callback: (err?: Error,
                                        dnsRecordId?: string) => void): void
{
    getZoneId(zoneName, auth, (error, zoneId) => {
        if (error || !zoneId) {
            callback(error || new Error("Unknown error"));
            return;
        }
        getDnsRecordId(zoneId, recordName, auth, (error2, dnsRecordId) => {
            if (error2) {
                callback(error2);
                return;
            }
            callback(undefined, dnsRecordId);
        });
    });
}

/**
 * Deletes the specified DNS record from CloudFlare. This function is only used
 * for testing this module.
 *
 * @param auth CloudFlare API authentication information.
 * @param recordName The name of the record.
 * @param zoneName The name of the zone.
 * @param callback Callback function called with any error that occurred.
 *
 * @private
 */
export function deleteDnsRecord(auth: Auth, recordName: string,
                                zoneName: string,
                                callback: (err?: Error) => void): void
{
    getZoneId(zoneName, auth, (error, zoneId) => {
        if (error || !zoneId) {
            callback(error || new Error("Unknown error"));
            return;
        }
        getDnsRecordId(zoneId, recordName, auth, (error2, dnsRecordId) => {
            if (error2) {
                callback(error2);
                return;
            }

            if (dnsRecordId) {
                getResults(`zones/${zoneId}/dns_records/${dnsRecordId}`,
                           auth,
                           (error3, results) => {
                               if (error3 || !results) {
                                   callback(
                                       error3 || new Error("Unknown error"));
                                   return;
                               }
                               callback();
                           },
                           "DELETE");
            } else {
                callback();
            }
        });
    });
}

/**
 * Creates a DNS record with the specified information.
 *
 * @param zoneId The zone ID.
 * @param dnsRecordName The DNS record name.
 * @param ip The IP to update the record with.
 * @param auth CloudFlare API authentication information.
 * @param callback Callback function called with any error that occurred.
 *
 * @private
 */
function createDnsRecord(zoneId: string, dnsRecordName: string,
                         ip: string, auth: Auth,
                         callback: (error?: Error) => void)
{
    getResults(`zones/${zoneId}/dns_records`,
               auth,
               (error, results) => {
                   if (error || !results) {
                       callback(error || new Error("Unknown error"));
                       return;
                   }
                   callback();
               },
               "POST",
               JSON.stringify({
                                  content: ip,
                                  name: dnsRecordName,
                                  type: "A"
                              }));
}

/**
 * Updates a DNS record with the specified information.
 *
 * @param zoneId The zone ID.
 * @param recordId The DNS record ID.
 * @param ip The IP to update the record with.
 * @param auth CloudFlare API authentication information.
 * @param callback Callback function called with any error that occurred.
 *
 * @private
 */
function updateDnsRecord(zoneId: string, recordId: string, ip: string,
                         auth: Auth, callback: (error?: Error) => void)
{
    getResults(`zones/${zoneId}/dns_records/${recordId}`,
               auth,
               (error, results) => {
                   if (error || !results) {
                       callback(error || new Error("Unknown error"));
                       return;
                   }
                   callback();
               },
               "PATCH",
               JSON.stringify({
                                  content: ip,
                                  type: "A"
                              }));
}

/**
 * Gets the DNS record ID associated with the specified record name.
 *
 * @param zoneId The zone ID.
 * @param dnsRecordName The DNS record name.
 * @param auth CloudFlare API authentication information.
 * @param callback Callback function called with any error that occurred, as
 *                 well as the DNS record ID.
 *
 * @private
 */
export function getDnsRecordId(zoneId: string, dnsRecordName: string,
                               auth: Auth,
                               callback: (error?: Error,
                                          dnsRecordId?: string) => void): void
{
    getResults(`zones/${zoneId}/dns_records`, auth, (error, results) => {
        if (error || !results) {
            callback(error || new Error("Unknown error"));
            return;
        }

        const matchingResults = results.filter(
            result => result.name === dnsRecordName);
        if (matchingResults.length === 0) {
            callback();
            return;
        }
        if (matchingResults.length > 1) {
            callback(new ApiError({
                message: `Multiple DNS record entries found with name`
                         + ` ${dnsRecordName}`,
                result: results
            }));
            return;
        }

        const result = matchingResults[0];
        if (!isString(result.id)) {
            callback(new ApiError({
                message: "ID for DNS record entry malformed or missing",
                result: results
            }));
            return;
        }

        callback(undefined, result.id);
    });
}

/**
 * Gets the zone ID associated with the specified zone name.
 *
 * @param zoneName The zone name.
 * @param auth CloudFlare API authentication information.
 * @param callback Callback function called with any error that occurred, as
 *                 well as the zone ID.
 *
 * @private
 */
export function getZoneId(zoneName: string, auth: Auth,
                          callback: (error?: Error,
                                     id?: string) => void): void
{
    getResults("zones", auth, (error, results) => {
        if (error || !results) {
            callback(error || new Error("Unknown error"));
            return;
        }

        const matchingResults = results.filter(
            result => result.name === zoneName);
        if (matchingResults.length === 0) {
            callback(new ApiError({
                message: `No zone entries found with name ${zoneName}`,
                result: results
            }));
            return;
        }
        if (matchingResults.length > 1) {
            callback(new ApiError({
                message: `No zone entries found with name ${zoneName}`,
                result: results
            }));
            return;
        }

        const result = matchingResults[0];
        if (!isString(result.id)) {
            callback(new ApiError({
                message: "ID for zone entry malformed or missing",
                result: results
            }));
            return;
        }

        callback(undefined, result.id);
    });
}

/**
 * Gets results from the CloudFlare API.
 *
 * @param path The URI.
 * @param auth CloudFlare API authentication information.
 * @param callback Callback function called with any error that occurred, as
 *                 well as the API results.
 * @param method The HTTP method.
 * @param body The request body.
 * @param startPage The start page associated with the request.
 *
 * @private
 */
export function getResults(path: string,
                           auth: Auth,
                           callback: (error?: Error, results?: any[]) => void,
                           method: string = "GET",
                           body?: string,
                           startPage: number = 1): void
{
    let uri = `${BASE_URL}/${path}`;
    if (method === "GET") {
        uri += `?page=${startPage}`;
    }
    const headers = {
        "X-Auth-Key": auth.key,
        "X-Auth-Email": auth.email
    };
    httpsRequest(uri, (error, response, responseBody) => {
        if (error) {
            callback(new ApiError({
                body: responseBody,
                innerError: error,
                message: "Error accessing CloudFlare API",
                response
            }));
            return;
        }

        if (!responseBody) {
            callback(new ApiError({
                innerError: error,
                message: "Missing response body",
                response
            }));
            return;
        }

        const json = JSON.parse(responseBody);
        if (!json.success) {
            callback(new ApiError({
                body: responseBody,
                message: "CloudFlare API returned success false",
                response
            }));
            return;
        }

        let results: any[] = [];
        if (isArray(json.result)) {
            results = results.concat(json.result);
        } else {
            results.push(json.result);
        }

        if (json.result_info
            && json.result_info.page
               < json.result_info.total_pages)
        {
            getResults(path, auth, (extraError, extraResults) => {
                if (error) {
                    callback(extraError);
                    return;
                }

                results = results.concat(extraResults);
                callback(undefined, results);
            }, method, body, startPage + 1);
        } else {
            callback(undefined, results);
        }
    }, method, headers, body);
}
