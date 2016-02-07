# cloudflare-dynamic-dns #

## Overview ##

`cloudflare-dynamic-dns` is a Node.js module that updates a CloudFlare DNS address record with an
IP address.

## Installation ##

```bash
npm install cloudflare-dynamic-dns
```

## Usage ##

The `cloudflare-dynamic-dns` module is a function which takes one argument, an options object, with
the following properties:

* `email` - the email associated with your CloudFlare account (string, mandatory)
* `apiToken` - the API token associated with your CloudFlare account (string, mandatory)
* `domain` - the domain corresponding to the DNS address record you wish to change (string, mandatory)
* `subdomain` - the subdomain corresponding to the DNS address record you wish to change; `"@"` to
update the apex record (string, mandatory)
* `ip` - the new IP address for the address record; if no IP address is specified, the external IP
address of the current machine is used (string, optional)

The function returns a `Promise` which resolves to the actual IP address if the request was
successful, or rejects with an `Error` if it was not.

## Example ##

The following example illustrates the basic usage of `cloudflare-dynamic-dns`, updating the A
record for `boo.example.com`:

```js
var cloudflareddns = require("cloudflare-dynamic-dns");

// Use external IP address of current machine
cloudflareddns({
    email: "jsmith@example.com",
    apiToken: "abcde12235",
    domain: "example.com",
    subdomain: "boo"
}).then(
    function (ip) {
        console.log("Updated boo.example.com to " + ip);
    },
    function (reason) {
        console.error(reason);
    }
);
```

## License ##

`cloudflare-dynamic-dns` is licensed under the [MIT license](http://opensource.org/licenses/MIT). Please see the
`LICENSE.md` file for more information.
