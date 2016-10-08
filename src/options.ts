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

import {isObject, isString, isUndefined} from "./utils";

/**
 * Represents CloudFlare API settings for key and email authentication.
 */
export interface IAuth {
    /**
     * The API key associated with your CloudFlare account.
     */
    key: string;
    /**
     * The email associated with your CloudFlare account.
     */
    email: string;
}

/**
 * Implementation of the IAuth interface used to provide default values
 * to fields.
 *
 * @private
 */
export class Auth implements IAuth {
    public key: string;
    public email: string;

    constructor(options: IAuth) {
        if (!isObject(options)) {
            throw new TypeError("options.auth should be an Object");
        }

        if (!isString(options.key)) {
            throw new TypeError("options.auth.key should be a string");
        } else {
            this.key = options.key;
        }

        if (!isString(options.email)) {
            throw new TypeError("options.auth.email should be a string");
        } else {
            this.email = options.email;
        }
    }
}

/**
 * The options associated with updating a CloudFlare DNS record with an IP
 * address.
 */
export interface IOptions {
    /**
     * CloudFlare API settings for key and email authentication.
     */
    auth: IAuth;
    /**
     * The new IP address for the record. If left undefined, the external IP as
     * defined by myexternalip.com API is used.
     */
    ip?: string;
    /**
     * The name of the DNS record (e.g. `subdomain.example.com`).
     */
    recordName: string;
    /**
     * The name of the CloudFlare zone (e.g. `example.com`).
     */
    zoneName: string;
}

/**
 * Implementation of the IOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
export class Options implements IOptions {
    public auth: Auth;
    public ip?: string;
    public recordName: string;
    public zoneName: string;

    constructor(options: IOptions) {
        this.auth = new Auth(options.auth);

        this.ip = options.ip;

        if (!isString(options.ip)) {
            if (!isUndefined(options.ip)) {
                throw new TypeError("options.ip should be a string or"
                                    + " undefined");
            }
        } else {
            this.ip = options.ip;
        }

        if (!isString(options.recordName)) {
            throw new TypeError("options.recordName should be a string");
        } else {
            this.recordName = options.recordName;
        }

        if (!isString(options.zoneName)) {
            throw new TypeError("options.zoneName should be a string");
        } else {
            this.zoneName = options.zoneName;
        }
    }
}
