const MetadataVerifier = require('./../metadataVerifier')

class RecordTypeVerifier extends MetadataVerifier {
    constructor(args) {
        super(args)
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.recordType-meta.xml');
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        let isVerified = true;
        if(!this.#hasDescription(metadataContent)) {
            console.error(`Record Type ${metadataFilePath} doesn't have a description`);
            isVerified = false;
        }
        
        return isVerified;
    }

    #hasDescription(metadataContent) {
        return metadataContent?.RecordType?.description?.[0];
    }
}

module.exports = RecordTypeVerifier