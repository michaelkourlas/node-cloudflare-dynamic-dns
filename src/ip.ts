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
import {httpsRequest} from "./request";

/**
 * @private
 */
const URL = "https://myexternalip.com/raw";

/**
 * Gets the current external IP from the myexternalip.com API.
 *
 * @param callback Callback function called with any error that occurred as
 *                 well as the IP address returned from the API.
 *
 * @private
 */
export function getExternalIp(callback: (error?: Error,
                                         ip?: string) => void): void {
    httpsRequest(URL, (error, response, responseBody) => {
        if (error) {
            callback(new ApiError({
                body: responseBody,
                message: `Error accessing ${URL}`,
                response
            }));
            return;
        }
        if (!responseBody) {
            callback(new ApiError({
                message: "Missing response body",
                response
            }));
            return;
        }
        callback(undefined, responseBody.trim());
    });
}
