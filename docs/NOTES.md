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

## Generation Completion

The website generation flow now ends on the Success page after a successful save.

The Success page:

- Confirms that the website was generated successfully.
- Displays the generated website folder name.
- Provides navigation back to the Home page.
- Provides navigation to create another website.

The existing generation pipeline and locked architecture remain unchanged.


## GitHub Deployment

The Web Edition now has the initial GitHub deployment pipeline in place.

- GitHub App: Website Generator Web
- Hosting account: Hasan-be27
- Hosting repository: WGwebsites
- One repository is used for all generated websites.
- Each website is stored in its own sanitized folder.
- GitHub Pages publishes the repository root.
- The deployment backend constructs the final website URL from the Pages base URL and website folder.
- The GitHub private key remains outside the Web Edition and is used only by the deployment backend.

Development deployment flow:

Web Edition
↓
Deployment backend
↓
GitHub App installation
↓
WGwebsites
↓
GitHub Pages
↓
Website-specific URL

The current backend is a local development service. It must not be exposed publicly without adding proper authentication/authorization to the deployment endpoint.

### Updated GitHub deployment flow

The Generate Website action now focuses on publishing the website. It no longer opens the local destination-folder picker before deployment.

During publishing, a full-screen loader prevents interaction with the Website Details page until the deployment process finishes.

After successful deployment, the Success page provides:

- The live GitHub Pages URL.
- An Open Website action.
- A Save Website Locally action for the previous local-folder generation behavior.
- A notice that GitHub Pages may briefly return 404 while the deployment finishes.

Cancelling the local folder picker is now independent from GitHub deployment.

## Current Project State

The Web Edition is the primary version of the Website Generator.

Architecture is locked for this version:
- App
- Router
- Pages
- Components
- Services

Components are migrated/adapted from the Electron project rather than unnecessarily rewritten.
No architecture changes should be introduced during this version. New ideas go to a future version.

The normal workflow remains:
design → implementation → testing → commit → documentation

## GitHub Hosting Architecture

The Website Generator now supports automatic hosting of generated websites through GitHub.

The intended architecture is:

Public Web Edition
    ↓
Deployment Server
    ↓
GitHub App
    ↓
Single public WGwebsites repository
    ↓
GitHub Pages

All generated websites are stored in the same `WGwebsites` repository, with one folder per generated website.

Example:
WGwebsites/
├── abc-bakery/
├── abc-bakery-2/
├── royal-restaurant/
└── ...

## GitHub App

A GitHub App has been created and installed for the deployment system.

The App is restricted to the required repository and permissions.

The GitHub App private key remains server-side and must never be included in the Web Edition or public repositories.

## Deployment Server

A separate Node.js/Express deployment server has been developed.

Current local flow:
Web Edition
    ↓
http://localhost:3000/github/deploy
    ↓
GitHub App authentication
    ↓
WGwebsites
    ↓
GitHub Pages

The deployment server currently:
- authenticates using the GitHub App
- uploads generated website files
- creates the required website folder
- returns the website-specific GitHub Pages URL
- validates deployment paths
- prevents path traversal
- limits request/file/deployment sizes
- limits deployment request frequency
- restricts CORS
- keeps GitHub credentials server-side
- prevents public access to development/admin endpoints

## Unique Website Names

Generated websites must never silently overwrite an existing website.

If a generated folder already exists, the deployment server automatically creates a numbered folder.

Example:
abc-bakery/
abc-bakery-2/
abc-bakery-3/

The Success page receives the actual URL corresponding to the unique folder.

## Current Web Edition Flow

The current Generate Website flow is:

Generate Website
    ↓
Collect website data
    ↓
Generate/render website
    ↓
Deploy directly to GitHub
    ↓
Show loading/blocking state during deployment
    ↓
Success Page

The folder picker is no longer part of the Generate Website process.

The Success Page now provides:
- live website link
- Open Website action
- Save Website Locally action
- Back/Home navigation

Saving locally is now a separate action and uses the folder picker only when the user explicitly chooses it.

The Success Page also informs the user that GitHub Pages may take a minute or two to finish deploying, so a temporary 404 can occur immediately after deployment.

## GitHub Pages

GitHub Pages is configured for the `WGwebsites` repository.

The repository root is the Pages site, while individual generated websites are served from their own subfolders.

Example:
https://hasan-be27.github.io/WGwebsites/abc-bakery/

The GitHub Pages API returns the repository-level Pages URL, so the deployment backend constructs the final website URL by appending the generated website folder.

## Important Hosting Decision

GitHub Actions was researched as a possible replacement for the deployment server.

Decision:
- Do NOT use GitHub Actions as the runtime deployment API.
- GitHub Actions can execute Node.js, but it is not a persistent Express server.
- Triggering workflows safely from the public Web Edition would require authentication that cannot simply be embedded in browser JavaScript.
- Therefore, GitHub Actions should not replace the deployment server.

Preferred production architecture:
Public Web Edition
    ↓ HTTPS
Online Node.js deployment server
    ↓
GitHub App
    ↓
WGwebsites
    ↓
GitHub Pages

GitHub Actions may later be used for CI/CD of the private deployment server.

## Planned Private Repository

A separate private GitHub repository should be created:
`WebsiteGenerator-Server`

It will contain the deployment backend source code.

It must NOT contain:
- `.env`
- GitHub App `.pem` private key
- other production secrets

The deployment server is currently still local. It has NOT yet been moved online.

## Current Security State

Backend hardening has been implemented locally.

Current protections include:
- restricted CORS
- deployment rate limiting
- request body limit
- file count limit
- individual file size limit
- total deployment size limit
- folder-name length/sanitization rules
- file-path validation
- path traversal protection
- server-side GitHub owner/repository configuration
- server-side GitHub App credentials
- local-only development/admin endpoints

A CORS issue was encountered after hardening and fixed. The Web Edition now works again with the local deployment server.

## UI Updates

Recent UI updates:
- Preview and Generate Website buttons were given more spacing.
- Dark text on dark backgrounds in the recent deployment/update UI was changed to light text.
- Home page tagline changed from:
  "Generate ready-to-host static websites in minutes."
  to:
  "Generate and Host static websites in minutes."

## Project Scope

GitHub deployment is a development/demo hosting feature, not intended to be treated as a commercial hosting service at this stage.

Local ZIP export remains part of the application.


## Project State

The Web Edition is the primary browser-based version of Website Generator.

The architecture remains locked:

- App
- Router
- Pages
- Components
- Services

Components are migrated/adapted from the Electron version where applicable rather than unnecessarily rewritten.

No architecture changes should be introduced during this version. New architectural ideas belong to a future version.

Development workflow:

1. Design
2. Implementation
3. Testing
4. Commit
5. Documentation

---

## Current Production Architecture

The Web Edition is publicly hosted using GitHub Pages:

https://hasan-be27.github.io/WebsiteGenerator-Web/

The deployment backend is hosted separately on Render:

https://websitegenerator-deployment-server.onrender.com

The backend communicates with GitHub using the configured GitHub App.

Generated websites are stored in the `WGwebsites` repository and published through GitHub Pages.

### Production Flow

Web Edition
→ Render Deployment Server
→ GitHub App
→ WGwebsites
→ GitHub Pages
→ Generated Website

The Web Edition can therefore be used without a local deployment server.

---

## Local Development

The Web Edition can still be run locally.

The deployment backend is now accessed through the production Render server rather than the previous local deployment server.

The Render backend allows both local development origins and the public GitHub Pages origin through CORS.

---

## Website Deployment

Pressing **Generate Website** directly starts the hosting/deployment process.

The user does not manually choose whether to deploy to GitHub.

The deployment process:

1. Collects website data.
2. Generates the website.
3. Sends the generated website files to the deployment backend.
4. The backend deploys the website to the `WGwebsites` repository.
5. GitHub Pages publishes the generated website.
6. The Success page provides the hosted website link.

GitHub Pages may take some time to publish a newly generated website. It is possible for the repository files to appear before the website becomes available, temporarily resulting in a 404.

The Success page therefore informs the user to wait if the website initially shows a 404.

---

## Duplicate Website Names

If a generated website name already exists, the deployment system automatically creates a unique name by adding a number.

This prevents an existing generated website from being overwritten.

---

## Download / Export

The Success page provides a **Download Website** function.

### Desktop

Desktop browsers that support the File System Access API use the folder picker.

The user chooses a parent directory and the website is created as:

```text
Business Name/
├── index.html
└── assets/
    ├── css/
    ├── js/
    └── images/