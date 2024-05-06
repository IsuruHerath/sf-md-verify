const MetadataVerifier = require('../metadataVerifier.js')

class ProfileVerifier extends MetadataVerifier {
    constructor(args) {
        super(args);
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.profile-meta.xml');
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        let isVerified = true;
        if(this.#hasModifyAllPermission(metadataContent)) {
            console.warn(`Profile ${metadataFilePath} has modify all permissions for one or more objects`);
        }

        if(this.#hasAllowDeletePermission(metadataContent)) {
            console.warn(`Profile ${metadataFilePath} has delete permission for one or more objects`);
            isVerified = false;
        }
        
        return isVerified;
    }

    #hasModifyAllPermission(metadataContent) {
        const objectPermissions = metadataContent?.Profile?.objectPermissions;
        if(!objectPermissions) {
            return false;
        }

        return objectPermissions.reduce((accumulator, objectPermission) => accumulator || (objectPermission.modifyAllRecords?.[0] == "true"), false);
    }

    #hasAllowDeletePermission(metadataContent) {
        const objectPermissions = metadataContent?.Profile?.objectPermissions;
        if(!objectPermissions) {
            return false;
        }

        return objectPermissions.reduce((accumulator, objectPermission) => accumulator || (objectPermission.allowDelete?.[0] == "true"), false);
    }
}

module.exports = ProfileVerifier