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

import * as http from "http";

/**
 * @private
 */
export interface IApiErrorOptions {
    message: string;
    innerError?: unknown;
    response?: http.IncomingMessage;
    body?: unknown;
    result?: unknown;
}

/**
 * Represents an error in contacting or parsing a response from the CloudFlare
 * API or the myexternalip.com API.
 */
export class ApiError extends Error {
    /**
     * The message associated with the error.
     */
    public message: string;

    /**
     * The error that caused this error, if applicable.
     */
    public innerError?: unknown;

    /**
     * The response returned from the API, if applicable.
     */
    public response?: http.IncomingMessage;

    /**
     * The body of the response returned from the API, if applicable.
     */
    public body?: unknown;

    /**
     * The API result, if applicable.
     */
    public result?: unknown;

    /**
     * @private
     */
    constructor(options: IApiErrorOptions) {
        super(options.message);
        this.message = options.message;
        this.innerError = options.innerError;
        this.response = options.response;
        this.body = options.body;
        this.result = options.result;
    }
}
