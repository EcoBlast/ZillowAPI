/* jslint node: true */
'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ZillowSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    zip_code: {type: String, required: true},
    response: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});

ZillowSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var Zillow = Mongoose.model('Zillow', ZillowSchema);

module.exports = Zillow;
