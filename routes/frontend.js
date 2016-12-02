#!/usr/bin/env node

'use strict';

var Error = require('./error');
var Zillow = require('./zillow');

module.exports = function (app) {

    app.post('/api/zillow', Zillow.saveDeepSearchResults, Zillow.sendJSON);

    app.get('/api/zillow', Zillow.getPosts, Zillow.sendJSON);
};
