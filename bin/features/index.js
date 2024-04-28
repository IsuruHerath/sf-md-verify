const printHelp = require('../help')

const verifyCustomFields = require('./fields-custom')

module.exports = (feature) => {
    switch (feature) {
        case 'fields:custom':
            verifyCustomFields();
            break;
        default:
            console.error(`Unknown feature: ${feature}`);
            printHelp();
            break;
    }
}