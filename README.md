# cloudflare-dynamic-dns #

[![Build Status](https://travis-ci.org/michaelkourlas/node-cloudflare-dynamic-dns.svg?branch=master)](https://travis-ci.org/michaelkourlas/node-cloudflare-dynamic-dns)
[![npm version](https://badge.fury.io/js/cloudflare-dynamic-dns.svg)](https://badge.fury.io/js/cloudflare-dynamic-dns)

## Overview ##

cloudflare-dynamic-dns is a Node.js module that updates a particular Cloudflare 
DNS record with an IP address, creating it if it does not exist.

## Installation ##

The easiest way to install cloudflare-dynamic-dns is using npm:

```
npm install cloudflare-dynamic-dns
```

You can also build cloudflare-dynamic-dns from source using npm:

```
git clone https://github.com/michaelkourlas/node-cloudflare-dynamic-dns.git
npm install
npm run-script build
```

The `build` script will build the production variant of 
cloudflare-dynamic-dns, run all tests, and build the documentation.

You can build the production variant without running tests using the script
`prod`. You can also build the development version using the script `dev`.
The only difference between the two is that the development version includes 
source maps.

## Usage ##

The documentation for the current version is available [here](http://www.kourlas.com/node-cloudflare-dynamic-dns/docs/1.0.2/).

You can also build the documentation using gulp:

```
gulp docs
```

## Examples ##

The following example illustrates the basic usage of cloudflare-dynamic-dns:

```javascript
var ddns = require("cloudflare-dynamic-dns");

var options = {
    auth: {
        email: "<email>",
        key: "<key>"
    },
    recordName: "foo.bar.com",
    zoneName: "bar.com"
};

ddns.update(options, function(err) {
    if (err) {
        console.log("An error occurred:");
        console.log(err);
    } else {
        console.log("Success!");
    }
});
```

Additional examples can be found in the examples directory.

## Tests ##

cloudflare-dynamic-dns includes a set of tests to verify core functionality. 
You can run the tests using npm:

```
npm run-script test-prod
```

The only difference between the `test-prod` and `test-dev` scripts is that the 
development version includes source maps.

## License ##

cloudflare-dynamic-dns is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
Please see the LICENSE.md file for more information.
