"use strict";
var combinedName = require("./combined-name");

function findSubdomainRecord(options, records) {
    var foundRecord = records.find(function (record) {
        return record["type"] === "A" && record["name"] === combinedName(options.subdomain, options.domain);
    });

    if (foundRecord) {
        return Promise.resolve(foundRecord);
    } else {
        return Promise.reject(new Error("Could not find A record for subdomain " + options.subdomain));
    }
}

module.exports = findSubdomainRecord;
