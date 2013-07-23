LightStore CLI
--------------

Command line interface for [LightStore](https://github.com/danstocker/lightstore).

Installation
------------

    npm install -g lightstore-cli

Usage
-----

    lightstore filename.ls [command] [command options]

Available commands:

- read: Reads the entire data file and writes the contents to stdout. Example: `lightstore filename.ls` read. May be omitted.
- write: Writes value to specified path. Path must be in [sntls.Tree]() notation. Value is attempted to be parsed as JSON before committing. Example: `lightstore filename.ls` write 'foo>bar' '{"key":"value"}'.
- compact: Compacts the datastore file. Speeds up subsequent reads.
