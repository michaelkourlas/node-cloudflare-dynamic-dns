"use strict";
/* jshint node:true */

/**
 * cloudflare-dynamic-dns
 * Copyright © 2014 Michael Kourlas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var email;
var apiToken;
var domain;
var subdomain;
var ip;

var http = require("http");
var https = require("https");
var querystring = require("querystring");

module.exports = function() {
    email = arguments[0];
    apiToken = arguments[1];
    domain = arguments[2];
    subdomain = arguments[3];
    ip = arguments[4];

    init(function() {
        getSubdomainRecord(function(record) {
            editRecord(record);
        });
    });
};

function init(callback) {
    if (typeof email !== "string") {
        throw new Error("email must be a string");
    }
    else if (email === "") {
        throw new Error("email cannot be empty");
    }
    email = email.trim();

    if (typeof apiToken !== "string") {
        throw new Error("apiToken must be a string");
    }
    else if (apiToken === "") {
        throw new Error("apiToken cannot be empty");
    }
    apiToken = apiToken.trim();

    if (typeof domain !== "string") {
        throw new Error("domain must be a string");
    }
    else if (domain === "") {
        throw new Error("domain cannot be empty");
    }
    domain = domain.trim();

    if (typeof subdomain !== "string") {
        throw new Error("subdomain must be a string");
    }
    else if (subdomain === "") {
        throw new Error("subdomain cannot be empty");
    }
    subdomain = subdomain.trim();

    if (typeof ip === "undefined") {
        getCurrentIp(function(ipaddr) {
            ip = ipaddr;
            callback();
        });
    }
    else {
        if (typeof ip !== "string") {
            throw new Error("ip must be a string or undefined");
        }
        else if (ip === "") {
            throw new Error("if ip is a string, it cannot be empty");
        }
        ip = ip.trim();

        callback();
    }
}

function getCurrentIp(callback) {
    var options = {
        hostname: "ipecho.net",
        path: "/plain",
        method: "GET"
    };

    http.get(options, function(res) {
        var data = "";

        res.on("data", function(chunk) {
            data += chunk;
        });

        res.on("end", function() {
            data = data.trim();
            callback(data);
        });

        res.on("error", function() {
            throw new Error("Could not retrieve external IP address for this machine");
        })
    });
}

function getSubdomainRecord(callback) {
    createOffsetRequest(callback);

    function createOffsetRequest(callback, o) {
        var query = querystring.stringify({
            "tkn": apiToken,
            "email": email,
            "a": "rec_load_all",
            "z": domain
        });

        if (typeof o !== "undefined") {
            query["o"] = o;
        }
        else {
            o = 0;
        }

        var options = {
            hostname: "www.cloudflare.com",
            path: "/api_json.html?" + query,
            method: "GET"
        };

        createRequest(options, function(record) {
            if (record === null) {
                createOffsetRequest(++o, function(record) {
                    callback(record);
                });
            }
            else {
                callback(record);
            }
        });
    }

    function createRequest(options, callback) {
        https.get(options, function(res) {
            var data = "";

            res.on("data", function(chunk) {
                data += chunk;
            });

            res.on("end", function() {
                try {
                    var json = JSON.parse(data);
                    if (json["result"] !== "success") {
                        //noinspection ExceptionCaughtLocallyJS
                        throw new Error("Response contains result 'failure'");
                    }

                    var hasMore = json["response"]["recs"]["has_more"];

                    var records = json["response"]["recs"]["objs"];
                    for (var i = 0; i < records.length; i++) {
                        if (records[i]["name"] === combinedName(subdomain, domain)) {
                            if (records[i]["type"] === "A") {
                                callback(records[i]);
                                return;
                            }
                            else {
                                //noinspection ExceptionCaughtLocallyJS
                                throw new Error("Existing record for subdomain " + subdomain + " not A record");
                            }
                        }
                    }

                    if (hasMore) {
                        callback(null);
                    }
                    else {
                        //noinspection ExceptionCaughtLocallyJS
                        throw new Error("Could not find record for subdomain " + subdomain)
                    }
                }
                catch(err) {
                    throw new Error("Could not parse domain records (message: " + err.message + ")");
                }
            });

            res.on("error", function() {
                throw new Error("Could not retrieve domain records");
            });
        });
    }
}

function combinedName(subdomain, domain) {
    if (subdomain === "@") {
        return domain;
    } else {
        return subdomain + "." + domain;
    }
}

function editRecord(record) {
    var query = querystring.stringify({
        "tkn": apiToken,
        "email": email,
        "a": "rec_edit",
        "id": record["rec_id"],
        "z": domain,
        "type": "A",
        "name": combinedName(subdomain, domain),
        "content": ip,
        "ttl": record["ttl"],
        "service_mode": record["service_mode"]
    });
    var options = {
        hostname: "www.cloudflare.com",
        path: "/api_json.html?" + query,
        method: "GET"
    };

    https.get(options, function(res) {
        var data = "";

        res.on("data", function(chunk) {
            data += chunk;
        });

        res.on("end", function() {
            try {
                var json = JSON.parse(data);
                if (json["result"] !== "success") {
                    //noinspection ExceptionCaughtLocallyJS
                    throw new Error("Response contains result 'failure'");
                }

                var rec = json["response"]["rec"]["obj"];
                if (rec["rec_id"] !== record["rec_id"] || rec["name"] !== (subdomain + "." + domain) ||
                    rec["content"] !== ip) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw new Error("Response does not match request");
                }
            }
            catch (err) {
                throw new Error("Could not parse response (message: " + err.message + ")");
            }
        });

        res.on("error", function() {
            throw new Error("Could not retrieve response");
        });
    });
}
