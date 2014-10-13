#!/usr/bin/env node

/*jshint node:true */
(function () {
    'use strict';

    var readline = require('readline').createInterface({
            input : process.stdin,
            output: process.stdout
        }),
        sntls = require('sntls'),
        lightstore = /** @type {lightstore} */require('lightstore'),
        fileName = process.argv[2],
        command = process.argv[3],
        ls; // datastore object

    /**
     * One iteration in the readline-loop.
     * Processes a single JavaScript command.
     * @param {string} answer
     */
    function prompt(answer) {
        var message;

        // evaluating command
        /*jshint evil:true */
        if (answer) {
            try {
                message = eval(answer);
                if (typeof message === 'object') {
                    message = JSON.stringify(message, null, 2);
                }
            } catch (e) {
                message = e.toString();
            }

            process.stdout.write(message + "\n");
        }

        // print next prompt
        if (!command) {
            readline.question("> ", prompt);
        } else {
            process.exit();
        }
    }

    /**
     * Opens LightStore file.
     * @param {string} fileName
     */
    function open(fileName) {
        ls = lightstore.PersistedTree.create(fileName)
            .load(prompt.bind(null, command));
    }

    /**
     * Shorthand for exiting from CLI.
     */
    function exit() {
        process.exit();
    }

    // initiating prompt either directly or by opening file
    if (fileName) {
        open(fileName);
    } else {
        prompt();
    }
}());
