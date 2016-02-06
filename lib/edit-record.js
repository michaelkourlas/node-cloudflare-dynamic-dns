"use strict";
var request = require("request-promise");
var combinedName = require("./combined-name");

function editRecord(options, record) {
    var requestOptions = {
        uri: "http://www.cloudflare.com/api_json.html",
        qs: {
            "tkn": options.apiToken,
            "email": options.email,
            "a": "rec_edit",
            "id": record["rec_id"],
            "z": options.domain,
            "type": "A",
            "name": combinedName(options.subdomain, options.domain),
            "content": options.ip,
            "ttl": record["ttl"],
            "service_mode": record["service_mode"]
        },
        json: true,
        method: "GET"
    };

    return request(requestOptions).then(function (json) {
        if (json["result"] !== "success") {
            return Promise.reject(new Error("Response does not contain result 'success'.\n\nRequest was:\n" + JSON.stringify(requestOptions, null, 2) + "\n\nResponse is: \n" + JSON.stringify(json, null, 2)));
        }

        var rec = json["response"]["rec"]["obj"];
        if (rec["rec_id"] !== record["rec_id"] || rec["name"] !== combinedName(options.subdomain, options.domain) || rec["content"] !== options.ip) {
            return Promise.reject(new Error("Response does not match request"));
        }

        return options.ip;
    });
}

module.exports = editRecord;
