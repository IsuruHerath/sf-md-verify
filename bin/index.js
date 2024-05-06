#!/usr/bin/env node
const handleFeature = require('./features')

const execute = (args) => {
    handleFeature(args._[0], args);
}

require('yargs')
.scriptName("sf-md-verify")
.usage('Usage: $0 <feature> [options]')
.command('fields [options]', 'Verify all fields', (yargs) => {}, execute)
.command('fields:custom [options]', 'Verify custom fields', (yargs) => {}, execute)
.command('flows [options]', 'Verify flows', (yargs) => {}, execute)
.command('permissionsets [options]', 'Verify permissionsets', (yargs) => {}, execute)
.command('profiles [options]', 'Verify profiles', (yargs) => {}, execute)
.command('record-types [options]', 'Verify record types', (yargs) => {}, execute)
.boolean('skip-packages').alias('skip-packages', ['s']).describe('skip-packages', 'Skip validation for metadata from packages')
.string('directory').alias('directory', ['d']).describe('directory', 'The path for the metadata directory')
.array('metadata-to-skip').alias('metadata-to-skip', ['m']).describe('metadata-to-skip', 'An array of metadata that should not be verified')
.help()
.argv;
