const FieldVerifier = require('./fields/FieldVerifier');
const CustomFieldVerifier = require('./fields/custom/customFieldVerifier');

function getMetadataVerifier(feature, args) {
    switch (feature) {
        case 'fields':
            return new FieldVerifier(args);
        case 'fields:custom':
            return new CustomFieldVerifier(args);
        default:
            throw new Error(`Unknown feature: ${feature}`);
    }
}

module.exports = (feature, args) => {
    try {
        const MetadataVerifier = getMetadataVerifier(feature, args);
        MetadataVerifier.verify();
    } catch(e) {
        console.error(e);
    }
}