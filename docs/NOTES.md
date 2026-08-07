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