const fs = require('fs')
const path = require('path')

class MetadataVerifier {
    constructor(args) {
        this.args = args;

        this.directory = this.#getDirectory(args);
    }

    verify() {
        const metadataFailedVerification = this._getMetadataThatFailedVerification(this.directory);
        if(metadataFailedVerification.length > 0) {
            process.exit(1);
        }
    }

    async _getMetadataThatFailedVerification(directory) {
        const metadataFiles = fs.readdirSync(directory);
        const metadataFailedVerification = [];
        for(const metadataFile of metadataFiles) {
            const metadataFilePath = path.join(directory, metadataFile);
            if(this.#isDirectory(metadataFilePath)) {
                const metadataFailedVerificationInSubDirectory = await this._getMetadataThatFailedVerification(metadataFilePath);
                metadataFailedVerification.push(...metadataFailedVerificationInSubDirectory);
            }
            
            if(!this._isMetadataTypeMatched(metadataFilePath)) {
                continue;
            }

            if(this._isMetadataVerified(metadataFilePath)) {
                continue;
            }
            
            metadataFailedVerification.push(metadataFilePath);
        }

        return metadataFailedVerification;
    }

    _isMetadataVerified(metadataFilePath) {
        return true;
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return true;
    }

    #isDirectory(metadataFilePath) {
        return fs.statSync(metadataFilePath).isDirectory();
    }

    #getDirectory(args) {
        const directory = args.directory;

        if(!directory) {
            console.error('Error: No directory is provided');
            process.exit(1);
        }

        if(!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
            console.error(`Error: ${directory} is not a valid directory`);
            process.exit(1);
        }

        return directory;
    }
}

module.exports = MetadataVerifier