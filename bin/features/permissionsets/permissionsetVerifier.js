const MetadataVerifier = require('../metadataVerifier.js')

class PermissionsetVerifier extends MetadataVerifier {
    constructor(args) {
        super(args);
    }

    _isMetadataTypeMatched(metadataFilePath) {
        return metadataFilePath.endsWith('.permissionset-meta.xml');
    }

    _isMetadataVerified(metadataFilePath, metadataContent) {
        let isVerified = true;
        if(this.#hasModifyAllPermission(metadataContent)) {
            console.warn(`PermissionSet ${metadataFilePath} has modify all permissions for one or more objects`);
        }

        if(this.#hasAllowDeletePermission(metadataContent)) {
            console.warn(`PermissionSet ${metadataFilePath} has delete permission for one or more objects`);
            isVerified = false;
        }
        
        return isVerified;
    }

    #hasModifyAllPermission(metadataContent) {
        const objectPermissions = metadataContent?.PermissionSet?.objectPermissions;
        if(!objectPermissions) {
            return false;
        }

        return objectPermissions.reduce((accumulator, objectPermission) => accumulator || (objectPermission.modifyAllRecords?.[0] == "true"), false);
    }

    #hasAllowDeletePermission(metadataContent) {
        const objectPermissions = metadataContent?.PermissionSet?.objectPermissions;
        if(!objectPermissions) {
            return false;
        }

        return objectPermissions.reduce((accumulator, objectPermission) => accumulator || (objectPermission.allowDelete?.[0] == "true"), false);
    }
}

module.exports = PermissionsetVerifier