const fs = require('fs')
const { parseString } = require('xml2js');
const path = require('path')

class MetadataVerifier {
    constructor(args) {
        this.args = args;

        this.directory = this.#getDirectory(args);
        this.metadataToSkip = this.#getMetadataToSkip(this.args);
    }

    async verify() {
        const metadataFailedVerification = await this._getMetadataThatFailedVerification(this.directory);
        if(metadataFailedVerification.length > 0) {
            console.error(`${metadataFailedVerification.length} metadata failures found.`);
            process.exit(1);
        }
    }

    async _getMetadataThatFailedVerification(directory) {
        const metadataFiles = fs.readdirSync(directory);
        const metadataFailedVerification = [];
        for(const metadataFile of metadataFiles) {
            const metadataFilePath = path.join(directory, metadataFile);
            if(this.#isMetadataToBeSkipped(metadataFilePath)) {
                continue;
            }

            if(this.#isDirectory(metadataFilePath)) {
                const metadataFailedVerificationInSubDirectory = await this._getMetadataThatFailedVerification(metadataFilePath);
                metadataFailedVerification.push(...metadataFailedVerificationInSubDirectory);
            }

            if(this.#shouldSkipPackages() && this._isPartOfAPackage(metadataFile)) {
                continue;
            }
            
            if(!this._isMetadataTypeMatched(metadataFilePath)) {
                continue;
            }

            const metadataContent = await this.#getMetadataContent(metadataFilePath);
            if(this._isMetadataVerified(metadataFilePath, metadataContent)) {
                continue;
            }
            
            metadataFailedVerification.push(metadataFilePath);
        }

        return metadataFailedVerification;
    }

    _isPartOfAPackage(metadataFile) {
        const regex = /__/g;
        const matches = metadataFile.match(regex);

        return matches && matches.length === 2;
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        throw new Error(`You have to implement the method to verify ${metadataFilePath} for ${metadataContent}`);
    }

    _isMetadataTypeMatched(metadataFilePath) {
        throw new Error(`You have to implement the method to check metadata type for ${metadataFilePath}`);
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

    #getMetadataToSkip(args) {
        const metadataToSkip = args. metadataToSkip ? args. metadataToSkip : [];
        return metadataToSkip;
    }

    #shouldSkipPackages() {
        return this.args.skipPackages;
    }

    #isMetadataToBeSkipped(metadataFilePath) {
        return this.metadataToSkip.includes(metadataFilePath)
    }

    #getMetadataContent(metadataFilePath) {
        const xmlString = fs.readFileSync(metadataFilePath, 'utf8');

        return new Promise((resolve, reject) => {
            parseString(xmlString, (err, result) => {
                if(err) {
                    reject(err);
                    return;
                }
    
                resolve(result);
            });
        });
    }
}

module.exports = MetadataVerifier