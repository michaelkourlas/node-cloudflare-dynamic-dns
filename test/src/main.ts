/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {deleteDnsRecord, getDnsRecord} from "../../lib/cloudflare";
import {update} from "../../lib/main";
import {Auth} from "../../lib/options";
import {assert} from "chai";

const auth = {
    email: process.env.CLOUDFLARE_API_EMAIL,
    key: process.env.CLOUDFLARE_API_KEY
};
const authObj = new Auth(auth);

const recordName = "cloudflare-dynamic-dns-test.kourlas.com";
const zoneName = "kourlas.com";

describe("main", () => {
    describe("#update", () => {
        it("should correctly create a DNS record with a specified"
           + " IP", (callback) => {
            deleteDnsRecord(authObj, recordName, zoneName, (err) => {
                assert.isUndefined(err);
                const options = {
                    auth,
                    ip: "1.1.1.1",
                    recordName,
                    zoneName
                };
                update(options, (err2) => {
                    assert.isUndefined(err2);
                    getDnsRecord(
                        authObj,
                        recordName,
                        zoneName,
                        (err3, dnsRecordId) => {
                            assert.isUndefined(err3);
                            assert.isString(dnsRecordId);

                            deleteDnsRecord(
                                authObj,
                                recordName,
                                zoneName,
                                (err4) => {
                                    assert.isUndefined(
                                        err4);
                                    callback();
                                });
                        });
                });
            });
        });

        it("should correctly update a DNS record with a specified"
           + " IP", (callback) => {
            deleteDnsRecord(authObj, recordName, zoneName, (err) => {
                assert.isUndefined(err);
                const options = {
                    auth,
                    ip: "1.1.1.1",
                    recordName,
                    zoneName
                };
                update(options, (err2) => {
                    assert.isUndefined(err2);
                    const options2 = {
                        auth,
                        ip: "1.1.1.1",
                        recordName,
                        zoneName
                    };
                    update(options2, (err3) => {
                        assert.isUndefined(err3);
                        getDnsRecord(
                            authObj,
                            recordName,
                            zoneName,
                            (err4, dnsRecordId) => {
                                assert.isUndefined(err4);
                                assert.isString(dnsRecordId);

                                deleteDnsRecord(
                                    authObj,
                                    recordName,
                                    zoneName,
                                    (err5) => {
                                        assert.isUndefined(err5);
                                        callback();
                                    });
                            });
                    });
                });
            });
        });

        it("should correctly create a DNS record with the external"
           + " IP", (callback) => {
            deleteDnsRecord(authObj, recordName, zoneName, (err) => {
                assert.isUndefined(err);
                const options = {
                    auth,
                    recordName,
                    zoneName
                };
                update(options, (err2) => {
                    assert.isUndefined(err2);
                    getDnsRecord(
                        authObj,
                        recordName,
                        zoneName,
                        (err3, dnsRecordId) => {
                            assert.isUndefined(err3);
                            assert.isString(dnsRecordId);

                            deleteDnsRecord(
                                authObj,
                                recordName,
                                zoneName,
                                (err4) => {
                                    assert.isUndefined(
                                        err4);
                                    callback();
                                });
                        });
                });
            });
        });

        it("should correctly update a DNS record with the external"
           + " IP", (callback) => {
            deleteDnsRecord(authObj, recordName, zoneName, (err) => {
                assert.isUndefined(err);
                const options = {
                    auth,
                    ip: "1.1.1.1",
                    recordName,
                    zoneName
                };
                update(options, (err2) => {
                    assert.isUndefined(err2);
                    const options2 = {
                        auth,
                        recordName,
                        zoneName
                    };
                    update(options2, (err3) => {
                        assert.isUndefined(err3);
                        getDnsRecord(
                            authObj,
                            recordName,
                            zoneName,
                            (err4, dnsRecordId) => {
                                assert.isUndefined(err4);
                                assert.isString(dnsRecordId);

                                deleteDnsRecord(
                                    authObj,
                                    recordName,
                                    zoneName,
                                    (err5) => {
                                        assert.isUndefined(err5);
                                        callback();
                                    });
                            });
                    });
                });
            });
        });
    });
});
