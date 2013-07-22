/**
 * Command line tool for accessing RJSON databases.
 */
/*jshint node:true */
(function () {
    'use strict';

    var $path = require('path'),
        lightstore = /** @type {lightstore} */require('lightstore'),
        stdout = process.stdout,
        argv = process.argv,
        fileName = argv[2],
        fileExt = $path.extname(fileName),
        isLightStore = fileExt === '.ls',
        store = isLightStore ?
            lightstore.KeyValueStore.create(fileName) :
            lightstore.Rjson.create(fileName),
        command = argv[3],
        args = argv.slice(4);

    //////////////////////////////
    // Utils

    /**
     * Outputs an error message to stdio.
     * @static
     * @param err {Error|string}
     */
    function error(err) {
        if (typeof err === 'string') {
            err = new Error(err);
        }
        stdout.write(err.toString() + "\n");
    }

    /**
     * Outputs a message to stdio.
     * @static
     * @param message {string}
     */
    function ok(message) {
        stdout.write(message + "\n");
    }

    //////////////////////////////
    // Parameter check

    if (!fileName) {
        ok("Usage: lightstore fileName [command] [data]");
        process.exit();
    }

    //////////////////////////////
    // Datastore access

    switch (command) {
    case 'compact':
        /**
         * Compacting database.
         */
        store.compact(function (err) {
            if (err) {
                error(err);
            } else {
                ok("Datastore compacted.");
            }
        });
        break;

    case 'write':
        if (!args.length) {
            break;
        }

        if (isLightStore) {
            // file is a lightstore file
            args[0] = args[0].toPath();
            try {
                args[1] = JSON.parse(args[1]);
            } catch (e) {
                // if parsing fails, we'll still write it as string
                error("Invalid JSON");
            }
        } else {
            // file is a plain RJSON
            try {
                args[0] = JSON.parse(args[0]);
            } catch (e) {
                error("Invalid JSON");
                break;
            }
        }

        args.push(function () {
            ok("Data written.");
        });

        store.write.apply(store, args);
        break;

    default:
    case 'read':
        /**
         * Reading database and outputs contents.
         */
        store.read(function (err, data) {
            if (err) {
                error(err);
            } else {
                ok(JSON.stringify(data, null, 2));
            }
        });
        break;
    }
}());
