#!/usr/bin/env node
'use strict';

var Constants = require('../config/constants');
var ZillowApi = require('../api/zillow');

var Zillow = {
    saveDeepSearchResults: function (req, res, next) {
        var options = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            zip_code: req.body.zip_code
        };
        ZillowApi.saveDeepSearchResults(options, function (err, response) {
            if (err) {
                return next(err);
            }
            req.data = {
                message: response || Constants.ZILLOW_DATA_SAVED
            };
            return next();
        });
    },

    getPosts: function (req, res, next) {
        ZillowApi.getPosts(function (err, posts) {
            if (err) {
                return next(err);
            }
            req.data = posts;
            return next();
        });
    },

    sendJSON: function (req, res, next) {
        res.json(req.data);
    }
};

module.exports = Zillow;

(function () {
    if (require.main == module) {
    }
}());
