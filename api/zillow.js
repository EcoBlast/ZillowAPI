#!/usr/bin/env node
'use strict';

var NodeZillow = require('node-zillow');
var zillow = new NodeZillow('X1-ZWz19knyi5bw97_a9fju');

var DataUtils = require('../lib/data_utils');
var ErrorConfig = require('../config/error');
var ZillowModel = require('../model/zillow');

var Zillow = {
    saveDeepSearchResults: function (options, cb) {
        var firstName = options.first_name;
        var lastName = options.last_name;
        var phone = options.phone;
        var email = options.email;
        var address = options.address;
        var city = options.city;
        var zipCode = options.zip_code;

        var err;
        if (DataUtils.isUndefined(firstName)) {
            err = new Error(ErrorConfig.MESSAGE.FIRST_NAME_REQUIRED);
        }
        if (!err && DataUtils.isUndefined(lastName)) {
            err = new Error(ErrorConfig.MESSAGE.LAST_NAME_REQUIRED);
        }
        if (!err && DataUtils.isUndefined(phone)) {
            err = new Error(ErrorConfig.MESSAGE.PHONE_NUMBER_REQUIRED);
        }
        if (!err && DataUtils.isInvalidEmail(email)) {
            err = new Error(ErrorConfig.MESSAGE.EMAIL_REQUIRED);
        }
        if (!err && DataUtils.isUndefined(address)) {
            err = new Error(ErrorConfig.MESSAGE.ADDRESS_REQUIRED);
        }
        if (!err && DataUtils.isUndefined(city)) {
            err = new Error(ErrorConfig.MESSAGE.CITY_REQUIRED);
        }
        if (!err && DataUtils.isUndefined(zipCode)) {
            err = new Error(ErrorConfig.MESSAGE.ZIP_CODE_REQUIRED);
        }


        var parameters = {
            address: address,
            citystatezip: zipCode
        };
        zillow.get('GetDeepSearchResults', parameters)
            .then(function (results) {
                var response = results.response;
                var message = results.message;
                var code = message && message.code;
                if (code != 0) {
                    err = new Error(message.text);
                    err.status = ErrorConfig.STATUS_CODE.BAD_REQUEST;
                    return cb(err);
                }

                var zillowOptions = {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    zip_code: zipCode,
                    response: JSON.stringify(response)
                };
                var data = new ZillowModel(zillowOptions);
                data.save(function (err) {
                    if (err) {
                        return cb(err);
                    }
                    var text = message.text;
                    return cb(null, text);
                });
            });
    },

    getPosts: function (cb) {
        ZillowModel.find({}, function (err, posts) {
            if (err) {
                return cb(err);
            }
            return cb(null, posts);
        });
    }
};

module.exports = Zillow;

(function () {
    if (require.main == module) {
        var options = {
            first_name: 'Dheeraj',
            last_name: 'Batra',
            phone: '+919971701509',
            email: 'codedhrj@gmail.com',
            address: '2114 Bigelow Ave',
            city: 'WA',
            zip_code: '98101'
        };
        Zillow.saveDeepSearchResults(options, console.log);
    }
}());
