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

You can also build cloudflare-dynamic-dns from source using gulp:

```
git clone https://github.com/michaelkourlas/node-cloudflare-dynamic-dns.git
npm install
gulp
```

You'll need to install gulp first if you don't have it:

```
npm install -g gulp
```

You can then copy the folder into your node_modules directory.

The `default` target will build the production variant of 
cloudflare-dynamic-dns, run all tests, and build the documentation.

You can build the production variant without running tests using the target
`prod`. You can also build the development version using the target `dev`. At
the moment, the only difference between the two is that the development version
includes source maps.

## Usage ##

The documentation for the current version is available [here](http://www.kourlas.com/node-cloudflare-dynamic-dns/docs/1.0.1/).

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
You can run the tests using gulp:

```
gulp test
```

The `test` target builds the production variant of cloudflare-dynamic-dns 
before running the tests. The `test-prod` target does the same thing, while the
`test-dev` target builds the development variant first instead.

## License ##

cloudflare-dynamic-dns is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
Please see the LICENSE.md file for more information.
