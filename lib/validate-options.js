"use strict";
var request = require("request-promise");
var _ = require("lodash");

function validateOptions(options) {
    return Promise.all(Object.keys(options).map(function (key) {
            if (key !== "ip") {
                return validateStringOption(options, key);
            }
        }))
        .then(function (pairs) {
            return _.compact(pairs);
        })
        .then(function (pairs) {
            return _.fromPairs(pairs);
        })
        .then(function (validOptionsExceptIp) {
            return validateOrLookupIp(options.ip).then(function (ip) {
                var validOptions = _.assign({}, validOptionsExceptIp, {ip: ip});
                return validOptions;
            });
        });
}

function validateStringOption(options, key) {
    return new Promise(function (resolve, reject) {
        if (typeof options[key] !== "string") {
            return reject(new Error(key + " must be a string"));
        }
        if (options[key] === "") {
            return reject(new Error(key + " cannot be empty"));
        }
        resolve([key, options[key].trim()]);
    });
}

function validateOrLookupIp(ip) {
    return new Promise(function (resolve, reject) {
        if (typeof ip === "undefined") {
            getCurrentIp().then(function (currentIp) {
                resolve(currentIp);
            }, function (reason) {
                reject(new Error("Error when looking up this machine's IP address: " + reason));
            });
        } else {
            if (typeof ip !== "string") {
                return reject(new Error("ip must be a string or undefined"));
            }
            if (ip === "") {
                return reject(new Error("if ip is a string, it cannot be empty"));
            }
            resolve(ip.trim());
        }
    });
}

function getCurrentIp() {
    return request("http://ipecho.net/plain");
}

module.exports = validateOptions;
