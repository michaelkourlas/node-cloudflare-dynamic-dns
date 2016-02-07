"use strict";
var request = require("request-promise");

function getSubdomainRecords(options, offset, recordsSoFar) {
    if (typeof offset === "undefined") {
        offset = 0;
    }
    if (typeof recordsSoFar === "undefined") {
        recordsSoFar = [];
    }

    var requestOptions = {
        uri: "http://www.cloudflare.com/api_json.html",
        qs: {
            "tkn": options.apiToken,
            "email": options.email,
            "a": "rec_load_all",
            "z": options.domain,
            "o": offset
        },
        json: true,
        method: "GET"
    };

    return request(requestOptions)
        .then(function (json) {
            if (json["result"] !== "success") {
                return Promise.reject(new Error("Response does not contain result 'success'.\n\nRequest was:\n" + JSON.stringify(requestOptions, null, 2) + "\n\nResponse is: \n" + JSON.stringify(json, null, 2)));
            }

            var hasMore = json["response"]["recs"]["has_more"];
            var records = json["response"]["recs"]["objs"];

            if (hasMore) {
                return getSubdomainRecords(options, offset + 1, recordsSoFar.concat(records));
            } else {
                return recordsSoFar.concat(records);
            }
        }).catch(function (reason) {
            return Promise.reject(new Error("Could not retrieve domain records: " + reason));
        });
}

module.exports = getSubdomainRecords;
