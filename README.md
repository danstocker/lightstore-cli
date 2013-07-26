LightStore CLI
--------------

Command line interface for [LightStore](https://github.com/danstocker/lightstore).

Installation
------------

    npm install -g lightstore-cli

Usage
-----

    lightstore [filename.ls] [JavaScript expression]

The LightStore CLI gives you a prompt-based interface where you can run JavaScript expressions as it were a Node prompt. Alternatively, you can specify a file name and expression up front, and have only that ran by the LightStore engine.

LightStore gives you the following globals (apart from the common JS and Node globals):

- `ls`: Reference to the query API. Instance of `lightstore.PersistedTree`, which inherits from [`sntls.Tree`](http://danstocker.github.io/sntls/sntls.Tree.html).
- `open()`: Opens a datastore file for read/write when none was specified in the command line.
- `exit()`: Shorthand for exiting the CLI. Calls `process.exit()`.

###Examples

Fetches datastore contents, dumps them to stdout and exits

    $ lightstore test.js 'ls.items'

Sets a value in the datastore

    $ lightstore test.js
    > ls.setNode('foo>bar'.toPath(), "hello")
    > ls.items
    {
      "foo": {
        "bar": "hello"
      }
    }
