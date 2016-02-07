"use strict";
var getSubdomainRecords = require("./get-subdomain-records");
var findSubdomainRecord = require("./find-subdomain-record");

function getSubdomainRecord(options) {
    return getSubdomainRecords(options).then(function (records) {
        return findSubdomainRecord(options, records);
    });
}

module.exports = getSubdomainRecord;
