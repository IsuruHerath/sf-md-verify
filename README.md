<h1 align="center">Salesfroce Metadata Verifier</h1>

## Description

Salesfroce Metadata Verifier helps verify that point of click metadata is created following best practices.

It provides a set of commands to verify different metadata types.

## Feedback

Please create a [new feature](https://github.com/IsuruHerath/sf-md-verify/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=) or a [new bug](https://github.com/IsuruHerath/sf-md-verify/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=)

## Usage

```sh-session
$ npm install -g sf-md-verify
$ sf-md-verify COMMAND [options]
running command...
$ sf-md-verify --version
1.0.4
$ sf-md-verify --help
Usage: sf-md-verify <feature> [options]

Commands:
  sf-md-verify fields [options]          Verify all fields
  sf-md-verify fields:custom [options]   Verify custom fields
  sf-md-verify flows [options]           Verify flows
  sf-md-verify permissionsets [options]  Verify permissionsets
  sf-md-verify profiles [options]        Verify profiles
  sf-md-verify record-types [options]    Verify record types

Options:
      --version           Show version number                          [boolean]
  -s, --skip-packages     Skip validation for metadata from packages   [boolean]
  -d, --directory         The path for the metadata directory           [string]
  -m, --metadata-to-skip  An array of metadata that should not be verified
                                                                         [array]
      --help              Show help                                    [boolean]
$ sf-md-verify --help COMMAND
sf-md-verify COMMAND [options]

<command description>

Options:
      --version           Show version number                          [boolean]
  -s, --skip-packages     Skip validation for metadata from packages   [boolean]
  -d, --directory         The path for the metadata directory           [string]
  -m, --metadata-to-skip  An array of metadata that should not be verified
                                                                         [array]
      --help              Show help                                    [boolean]
```

## Commands

* `sf-md-verify fields --directory force-app`
* `sf-md-verify fields:custom --directory force-app`
* `sf-md-verify flows --directory force-app`
* `sf-md-verify permissionsets --directory force-app`
* `sf-md-verify profiles --directory force-app`
* `sf-md-verify record-types --directory force-app`

To skip verifing metadata from packages use `(-s|--skip-packages)` flags. To skip any specific metadata file, use (-m|--metadata-to-skip) flags followed by an array of metadata files.

```
sf-md-verify fields --directory force-app -s -m \
  'force-app\main\default\objects\Account\fields\Name.field-meta.xml' \
  'force-app\main\default\objects\Account\fields\Name.field-meta.xml'
```