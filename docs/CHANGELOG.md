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