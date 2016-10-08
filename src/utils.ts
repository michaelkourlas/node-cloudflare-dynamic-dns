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

/**
 * @private
 */
export function isString(val: any): val is string {
    return Object.prototype.toString.call(val) === "[object String]";
}

/**
 * @private
 */
export function isUndefined(val: any): val is undefined {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}

/**
 * @private
 */
export function isObject(val: any): val is Object {
    return Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * @private
 */
export function isArray(val: any): val is any[] {
    return Object.prototype.toString.call(val) === "[object Array]";
}
