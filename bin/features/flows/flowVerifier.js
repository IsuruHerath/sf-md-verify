const MetadataVerifier = require('./../metadataVerifier')

class FlowVerifier extends MetadataVerifier {
    constructor(args) {
        super(args)
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.flow-meta.xml');
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        let isVerified = true;
        if(!this.#hasDescription(metadataContent)) {
            console.error(`Flow ${metadataFilePath} doesn't have a description`);
            isVerified = false;
        }
        
        return isVerified;
    }

    #hasDescription(metadataContent) {
        return metadataContent?.Flow?.description?.[0];
    }
}

module.exports = FlowVerifier