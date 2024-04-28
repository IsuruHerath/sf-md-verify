#!/usr/bin/env node

const handleFeature = require('./features')
const printHelp = require('./help')

const args = process.argv.slice(2);

function isArgumentsNotAvailable(args) {
    return args.length === 0;
}

function isAskingForHelp(arg) {
    return arg === '--help';
}

if (isArgumentsNotAvailable(args) || isAskingForHelp(args[0])) {
    printHelp();
} else {
    handleFeature(args[0]);
}
