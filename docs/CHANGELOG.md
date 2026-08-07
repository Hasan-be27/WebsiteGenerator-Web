# CHANGELOG

## M1 - Foundation

### Added

- Project folder structure.
- Application bootstrap.
- App class.
- Router.
- ComponentLoader.
- Page metadata system.
- Home page metadata.
- Website Details page metadata.
- Preview page metadata.
- Success page metadata.
- Dynamic HTML loading.
- Automatic CSS loading.
- Dynamic JavaScript module loading.
- Shared Component base class.
- Bootstrap integration.
- Global application stylesheet.

### Improved

- Router now receives ComponentLoader via dependency injection.
- ComponentLoader automatically discovers component assets using naming conventions.
- Components are isolated to their own root DOM element.
- CSS is cached and loaded only once.
- JavaScript modules are cached after first import.

### Architecture

Framework foundation completed.

Application now follows the locked architecture.


## Version 0.2.0

### Added

- Completed migration of all UI components
- Home component
- Business Information component
- Hero component
- About component
- Highlight component
- Services component
- Contact component
- Generate Bar component

### Added

- Component lifecycle

constructor()

↓

init()

↓

registerEvents()

↓

validate()

↓

getData()

### Changed

- Migrated components to ES Modules
- Removed Electron global classes
- Removed window.* registrations
- Removed ImageUploader dependency
- Removed Validation dependency
- Removed Generator dependency
- Added browser-native preparation for image upload
- Components now initialize through ComponentLoader

### Improved

- Consistent component structure
- Consistent root elements
- Cleaner separation between UI and business logic
- Better preparation for future services

### Architecture

No architectural changes.

Project continues under the locked architecture established before implementation.