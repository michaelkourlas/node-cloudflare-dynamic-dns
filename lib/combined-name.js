"use strict";
function combinedName(subdomain, domain) {
    if (subdomain === "@") {
        return domain;
    } else {
        return subdomain + "." + domain;
    }
}

module.exports = combinedName;
