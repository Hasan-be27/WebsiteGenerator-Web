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


## 2026-08-09

### Added

- Added working website preview functionality.
- Preview now opens in a new browser tab.
- Preview renders using the actual Handlebars website template.
- Added dynamic loading of Handlebars partials.
- Added temporary image handling for previews.
- Added local website generation through the browser filesystem API.
- Added generation of the complete website asset structure.
- Added copying of uploaded Hero and About images into generated website assets.
- Restored/verified template JavaScript and favicon assets.
- Added integration between GeneratorService, StorageService, and TemplateService.

### Changed

- Preview no longer depends on a previously generated website.
- Preview is available regardless of form validation state.
- Generate Website remains validation-controlled.
- Image handling was separated between temporary preview URLs and permanent generated image files.

### Fixed

- Fixed `[object File]` appearing as image sources.
- Fixed generated websites referencing temporary `blob:` image URLs.
- Fixed missing template JavaScript asset in generated/preview websites.
- Fixed missing favicon asset.
- Fixed template partial rendering.
- Fixed About validation behavior when image and description are entered in different orders.

### Verified

A generated website was tested and confirmed to contain:

- `index.html`
- `assets/css/style.css`
- `assets/js/script.js`
- Hero image
- About image

The generated website renders correctly outside the generator.