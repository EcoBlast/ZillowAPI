'use strict';
/*jslint node: true */

var DataUtils = {
    isDefined: function (value) {
        return value !== undefined && value !== null && value.trim().length > 0;
    },

    isUndefined: function (value) {
        return !DataUtils.isDefined(value);
    },

    isValidEmail: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },

    isInvalidEmail: function (value) {
        return !DataUtils.isValidEmail(value);
    }
};

module.exports = DataUtils;

(function () {
    if (require.main === module) {
    }
}());
