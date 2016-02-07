## 2.0.0 ##

* **Feature:** Supports updating A record for the apex domain (no www), using `"@"` as hostname.
* **API Breaking change:** Takes an options object as the single argument.
* **API Breaking change:** Returns a `Promise` which resolves to the actual IP address if the
request was successful, or rejects with an `Error` if it was not. Requires Node.js 0.12 or later.
* **Fix:** Supports using this module for several requests at the same time, thanks to not keeping
or mutating internal global state.

## 0.1.1 ##

* Fixed error in documentation

## 0.1.0 ##

* Initial release
