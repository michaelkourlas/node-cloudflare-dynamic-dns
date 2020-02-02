/**
 * Copyright (C) 2016-2019 Michael Kourlas
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

import {ICloudFlareResponse, IDnsRecord, IZone} from "./cloudflare";

/**
 * Returns whether or not the value is a string.
 *
 * @private
 */
export function isString(val: unknown): val is string {
    return Object.prototype.toString.call(val) === "[object String]";
}

/**
 * Returns whether or not the value is undefined.
 *
 * @private
 */
export function isUndefined(val: unknown): val is undefined {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}

/**
 * Returns whether or not the value is an object.
 *
 * @private
 */
export function isObject(val: unknown): val is Record<string, unknown> {
    return Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * Returns whether or not the value is an array.
 *
 * @private
 */
export function isArray(val: unknown): val is unknown[] {
    return Object.prototype.toString.call(val) === "[object Array]";
}

/**
 * Returns whether or not the value is a number.
 *
 * @private
 */
export function isNumber(val: unknown): val is number {
    return Object.prototype.toString.call(val) === "[object Number]";
}

/**
 * Returns whether or not the value is a boolean.
 *
 * @private
 */
export function isBoolean(val: unknown): val is boolean {
    return Object.prototype.toString.call(val) === "[object Boolean]";
}

/**
 * Returns whether or not the value is an ICloudFlareResponse.
 *
 * @private
 */
export function isCloudFlareResponse(val: unknown): val is ICloudFlareResponse {
    return isObject(val) && "success" in val && isBoolean(val.success)
           && (!("result_info" in val)
               || (isObject(val.result_info)
                   && "page" in val.result_info
                   && isNumber(val.result_info.page)
                   && "total_pages" in val.result_info
                   && isNumber(val.result_info.total_pages)));
}

/**
 * Returns whether or not the value is an IDnsRecord array.
 *
 * @private
 */
export function isDnsRecordArray(val: unknown[]): val is IDnsRecord[] {
    return val.every((e) => isObject(e) && "name" in e && isString(e.name)
                            && "id" in e && isString(e.name));
}

/**
 * Returns whether or not the value is an IZone array.
 *
 * @private
 */
export function isZoneArray(val: unknown[]): val is IZone[] {
    return val.every((e) => isObject(e) && "name" in e && isString(e.name)
                            && "id" in e && isString(e.name));
}
