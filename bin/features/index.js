const FieldVerifier = require('./fields/fieldVerifier');
const CustomFieldVerifier = require('./fields/custom/customFieldVerifier');
const FlowVerifier = require('./flows/flowVerifier');
const PermissionsetVerifier = require('./permissionsets/permissionsetVerifier');
const ProfileVerifier = require('./profiles/profileVerifier');
const RecordTypeVerifier = require('./record-types/recordTypeVerifier');

function getMetadataVerifier(feature, args) {
    switch (feature) {
        case 'fields':
            return new FieldVerifier(args);
        case 'fields:custom':
            return new CustomFieldVerifier(args);
        case 'flows':
            return new FlowVerifier(args);
        case 'permissionsets':
            return new PermissionsetVerifier(args);
        case 'profiles':
            return new ProfileVerifier(args);
        case 'record-types':
            return new RecordTypeVerifier(args);
        default:
            throw new Error(`Unknown feature: ${feature}`);
    }
}

module.exports = (feature, args) => {
    const MetadataVerifier = getMetadataVerifier(feature, args);
    MetadataVerifier.verify();
}