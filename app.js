/* jslint node: true */
'use strict';

// Using the express framework with node.js
var Express = require('express');
var Router = Express.Router();
// Body Parser - to parse the body of request
var BodyParser = require('body-parser');

var Mongoose = require('mongoose');
// Localhost - refers to the domain of our Database
// dynalab_dev is our database name - Change accordingly
Mongoose.connect('mongodb://localhost/kulahari_dev');

var App = Express();
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended: true}));
App.use(Router);

// routes/frontend includes all our API paths and corresponding middleware
require('./routes/frontend')(App);

// If no matched route was found, app return 404
App.use(function (req, res, next) {
  res.sendStatus(404);
});
module.exports = App;
