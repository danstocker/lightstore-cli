/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    var params = {
        files: [
            'js/lightstore-cli.js'
        ],

        test: [],

        globals: {}
    };

    // invoking common grunt process
    require('common-gruntfile')(grunt, params);
};
