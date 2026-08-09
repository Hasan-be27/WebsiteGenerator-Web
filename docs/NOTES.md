# NOTES

## Project
Website Generator Web

## Framework Status
M1 (Foundation) is functionally complete.

The application now has a fully working framework capable of:

- Starting the application
- Registering pages
- Navigating using the Router
- Loading components by convention
- Automatically loading component HTML
- Automatically loading component CSS
- Dynamically importing component JavaScript
- Initializing components
- Using a shared base Component class

## Locked Architecture

Website Generator Web

- App
- Router
- ComponentLoader
- Pages
- Components
- Services

No architectural changes will be made during this project.

Future improvements will be documented for Version 2.

## Locked Development Rules

- Reuse before rewrite.
- Browser-native APIs only.
- One responsibility per class.
- Pages contain metadata only.
- Components are completely self-contained.
- Services contain business logic only.
- Every milestone ends with a working application.
- Documentation is updated after meaningful progress.
- Git commits are made after stable milestones/features.

## Locked Component Convention

Each component consists of:

component.html
component.css
component.js

Each component has exactly one root HTML element.

Each component extends the shared Component base class.

Each component receives its root element through the constructor.

Components only manipulate their own DOM.

No component accesses another component directly.

## Locked Rendering Convention

Router
↓

Page
↓

ComponentLoader
↓

Load CSS (once)
↓

Load HTML
↓

Load JavaScript
↓

Instantiate Component
↓

component.init()

## Locked CSS Hierarchy

1. bootstrap.min.css
2. app.css
3. component.css

No inline styles unless absolutely necessary.

## Locked ComponentLoader Convention

Component names determine file locations automatically.

Example:

Hero

↓

components/Hero/

hero.html

hero.css

hero.js

No explicit file configuration is required.

## Dependency Ownership

App owns:

- Router
- ComponentLoader

Router owns:

- Registered Pages

ComponentLoader owns:

- Loaded CSS cache
- Loaded JavaScript module cache

Components own:

- Their own DOM

## Current Status

Milestone 2 (Components) is complete.

The application now uses the new locked architecture and all UI components have been successfully migrated from the Electron project into the Web Edition.

The migration focused on reusing existing code wherever possible while removing Electron-specific dependencies.

---

## Completed

### Foundation (M1)

- Project structure established
- App class
- Router
- Component Loader
- Page system
- ES Module architecture
- Bootstrap integrated locally
- Event-based navigation
- Base Component class

### Components (M2)

- Home
- Business Information
- Hero
- About
- Highlight
- Services
- Contact
- Generate Bar

All components now:

- Follow the new Component lifecycle
- Use ES Modules
- Are self-contained
- Have a single root element
- Load dynamically through ComponentLoader
- Contain no Electron-specific code

---

## Component Lifecycle

Every component follows:

constructor()

↓

init()

↓

registerEvents()

↓

validate()

↓

getData()

This order is now the project standard.

---

## Architecture

Architecture remains frozen.

No architectural changes have been made since the freeze.

All improvements beyond this point will fit inside the existing architecture.

---

## Next Milestone

M3 — Services

- ValidationService
- GeneratorService
- TemplateService
- StorageService
- Data collection
- Component validation

## Current State

The Web Edition now has a working end-to-end website generation pipeline.

### Architecture

The architecture is frozen for this version:

- App
- Router
- Pages
- Components
- Services

Components are migrated/adapted from the Electron version rather than unnecessarily rewritten.

No architectural changes should be introduced during this version.

New ideas or structural improvements belong to a future version.

---

## Current Application Flow

### Navigation

Home
→ Website Details
→ Preview / Generate Website

The Router and ComponentLoader are working correctly.

---

## Validation

Validation is handled centrally through `ValidationService`.

Current required sections:

- Business Information
- Hero
- About
- Services
- Contact

The About validation issue related to image-selection order was investigated and resolved.

Validation now behaves correctly regardless of whether the image or description is entered first.

---

## Preview

Preview is independent from website generation.

The Preview button:

1. Collects the currently entered website data.
2. Converts selected local image `File` objects into temporary object URLs.
3. Renders the current data through the actual website template.
4. Opens the result in a new browser tab.
5. Does not require all fields to be valid.
6. Does not permanently save the generated website.

This means Preview represents the website as it currently exists in the form.

Preview uses the same template and partials as the generated website.

---

## Website Generation

Generate Website performs the actual generation process.

Current flow:

1. Collect website data.
2. Save website data through `StorageService`.
3. Render the Handlebars template.
4. Create the website files.
5. Copy required template assets.
6. Copy uploaded images into the generated website.
7. Allow the user to choose a destination folder.

A successful generated website currently contains:

```text
Business Name/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── fonts/
    ├── icons/
    └── images/
        ├── hero image
        └── about image