const MetadataVerifier = require('../metadataVerifier.js')

class FieldVerifier extends MetadataVerifier {
    constructor(args) {
        super(args);
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.field-meta.xml');
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        let isVerified = true;
        if(!this.#hasDescription(metadataContent)) {
            console.error(`Field ${metadataFilePath} doesn't have a description`);
            isVerified = false;
        }
        
        return isVerified;
    }

    #hasDescription(metadataContent) {
        return metadataContent?.CustomField?.description?.[0];
    }
}

module.exports = FieldVerifier