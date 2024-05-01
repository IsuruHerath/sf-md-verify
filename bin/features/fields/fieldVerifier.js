const fs = require('fs')
const { parseString } = require('xml2js');

const MetadataVerifier = require('../metadataVerifier')

class FieldVerifier extends MetadataVerifier {
    constructor(args) {
        super(args);

        this.fieldsToIgnore = this.#getFieldsToIgnore(this.args);
    }

    async _isMetadataVerified(metadataFilePath) {
        if(this.fieldsToIgnore.includes(metadataFilePath)) {
            return true;
        }

        const xmlString = fs.readFileSync(metadataFilePath, 'utf8');
        const hasDescription = await this.#hasNonEmptyDescription(xmlString);
        if(!hasDescription) {
            console.error(`Field ${metadataFilePath} doesn't have a description`);
        }
        return hasDescription;
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.field-meta.xml');
    }

    #hasNonEmptyDescription(xmlString) {
        return new Promise((resolve, reject) => {
            parseString(xmlString, (err, result) => {
                if(err) {
                    reject(err);
                    return;
                }
    
                const description = result?.CustomField?.description?.[0];
                resolve(Boolean(description && description.trim()));
            });
        });
    }

    #getFieldsToIgnore(args) {
        const fieldsToIgnore = args.fieldsToIgnore ? args.fieldsToIgnore : [];
        return fieldsToIgnore;
    }
}

module.exports = FieldVerifier