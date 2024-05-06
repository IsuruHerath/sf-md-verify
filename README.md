<h1 align="center">Salesfroce Metadata Verifier</h1>

## Description
Salesfroce Metadata Verifier helps verify that point of click metadata is created following best practices.

It provides a set of commands to verify different metadata types.

## Usage
To check the available features execute `sf-md-verify --help`. It will list down all the available features of the package with a short description.
```
sf-md-verify <feature> [args]

Commands:
  sf-md-verify fields:custom [directory] [fieldsToSkip]   Verify custom fields
  sf-md-verify fields [directory] [fieldsToSkip]          Verify custom fields

Options:
  --version  Show version number                       [boolean]
  --help     Show help                                 [boolean]
```

Inorder to drill down further, you can request help for each individual feature. Simply execute `sf-md-verify fields --help`. It will display help information of the requested feature.
```
sf-md-verify fields [directory] [fieldsToSkip]

Verify custom fields

Positionals:
  directory     the path to metadata directory                          [string]
  fieldsToSkip  An array of fields that should not be verified     [default: []]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## An Example Use Case
To verify only the custom fields on a metadata package, execute following command by replacing argument values with your own values.
### Command
```
sf-md-verify fields:custom --directory force-app
```
### Output
```
Field system\main\default\objects\Account\fields\Name.field-meta.xml doesn't have a description
Field system\main\default\objects\Account\fields\Primary_Contact__c.field-meta.xml doesn't have a description
Field system\main\default\objects\Activity\fields\Custom_Status__c.field-meta.xml doesn't have a description
```