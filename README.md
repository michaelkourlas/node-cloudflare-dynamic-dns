# cloudflare-dynamic-dns #

## Overview ##

cloudflare-dynamic-dns is a Node.js module that updates a Cloudflare DNS address record with an IP address.

## Installation ##

The easiest way to install cloudflare-dynamic-dns is to use npm: `npm install cloudflare-dynamic-dns`.

Alternatively, you may download the source from GitHub and copy it to a folder named "cloudflare-dynamic-dns" within
your "node_modules" directory.

## Usage ##

The cloudflare-dynamic-dns module contains one function which takes the following arguments:

* `email` - the email associated with your Cloudflare account (string, mandatory)
* `api_token` - the API token associated with your Cloudflare account (string, mandatory)
* `domain` - the domain corresponding to the DNS address record you wish to change (string, mandatory)
* `subdomain` - the subdomain corresponding to the DNS address record you wish to change (string, mandatory)
* `ip` - the new IP address for the address record; if no IP address is specified, the external IP address of the
  current machine is used (string, optional)
  
The function returns nothing if the request was successful, and throws an error if it was not.

## Examples ##

The following example illustrates the basic usage of cloudflare-dynamic-dns, updating the A record for 
boo.example.com:

    var cloudflareddns = require("cloudflare-dynamic-dns");

	cloudflareddns("jsmith@example.com", "example.com", "boo", "abcde12235");
	
## License ##

cloudflare-dynamic-dns is licensed under the [MIT license](http://opensource.org/licenses/MIT). Please see the 
LICENSE.md file for more information.
