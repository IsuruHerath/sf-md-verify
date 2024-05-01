#!/usr/bin/env node
const handleFeature = require('./features')

const execute = (args) => {
    handleFeature(args._[0], args);
}

require('yargs')
.scriptName("sf-md-verify")
.usage('$0 <feature> [args]')
.command('fields:custom [directory] [fieldsToSkip]', 'Verify custom fields', (yargs) => {
    yargs.positional('directory', {
        type: 'string',
        describe: 'the path to metadata directory'
    }),
    yargs.positional('fieldsToSkip', {
        type: 'array',
        default: [],
        describe: 'An array of fields that should not be verified'
    })
}, execute)
.command('fields [directory] [fieldsToSkip]', 'Verify custom fields', (yargs) => {
    yargs.positional('directory', {
        type: 'string',
        describe: 'the path to metadata directory'
    }),
    yargs.positional('fieldsToSkip', {
        type: 'array',
        default: [],
        describe: 'An array of fields that should not be verified'
    })
}, execute)
.help()
.argv;
