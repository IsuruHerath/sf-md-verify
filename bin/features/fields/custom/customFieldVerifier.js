const FieldVerifier = require('../fieldVerifier')

class CustomFieldVerifier extends FieldVerifier {
    constructor(args) {
        super(args)
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('__c.field-meta.xml');
    }
}

module.exports = CustomFieldVerifier