# TODO

## M2 - Components

- Home
- Business Information
- Hero
- About
- Highlight
- Services
- Contact
- Generate Bar

## M3 - Services

- ValidationService
- GeneratorService
- TemplateService
- StorageService
- ZipService
- GitHubService

## M4 - Preview

- Live Preview
- Responsive Preview
- Template Rendering

## M5 - Export

- Website Generation
- ZIP Export
- Image Processing

## M6 - GitHub

- Authentication
- Repository Creation
- Push Generated Website
- GitHub Pages Deployment
- Return Published URL



## Current Priority

### Generate Website

- [x] Collect website data
- [x] Render Handlebars template
- [x] Load all template partials
- [x] Generate index.html
- [x] Generate/copy asset structure
- [x] Copy uploaded images
- [x] Allow user to choose output directory
- [x] Verify generated website manually
- [x] Add proper generation completion / Success screen
- [x] Improve output-folder/user experience

---

## Preview

- [x] Preview button
- [x] Preview without requiring Generate Website
- [x] Preview without requiring validation
- [x] Collect current form data
- [x] Render through actual template
- [x] Handle local images temporarily
- [x] Open preview in a new browser tab
- [x] Verify visual rendering
- [x] Restore/verify template JS and favicon assets

---

## Output

- [x] Local website generation
- [x] Complete asset copying
- [x] Image copying
- [ ] Export website as ZIP
- [ ] Improve handling of destination folders
- [x] Finalize Success screen

---

## GitHub

- [x] Authenticate deployment backend with GitHub App
- [x] Connect deployment backend to WGwebsites
- [x] Upload test website to repository
- [x] Configure GitHub Pages
- [x] Generate website-specific Pages URL
- [x] Upload generated website from Web Edition
- [x] Deploy generated website automatically
- [x] Display deployed website URL
- [ ] Secure public deployment backend

---

## Mobile

- [ ] Review mobile filesystem/output behavior
- [ ] Decide appropriate mobile export mechanism
- [ ] Consider ZIP download for mobile
- [ ] Ensure Preview remains usable on mobile

---

## Documentation

- [x] Update NOTES.md
- [x] Update CHANGELOG.md
- [x] Update TODO.md
- [ ] Commit current milestone

## Current Priority — Production Deployment Infrastructure

### M6.4-B — Production Deployment Server

- [ ] Create private GitHub repository: `WebsiteGenerator-Server`
- [ ] Commit the current hardened deployment-server code to the private repository.
- [ ] Ensure `.env` and `.pem` are excluded by `.gitignore`.
- [ ] Prepare the deployment server specifically for production.
- [ ] Choose and configure an online Node.js hosting service.
- [ ] Preferred current option: Render.
- [ ] Deploy the private deployment server online with HTTPS.
- [ ] Configure production environment variables/secrets.
- [ ] Store the GitHub App private key securely on the server.
- [ ] Configure production CORS to allow only the Web Edition origin.
- [ ] Add production request authentication / abuse protection.
- [ ] Keep GitHub credentials completely server-side.
- [ ] Update the Web Edition to use the production deployment-server URL.
- [ ] Test deployment from the public-facing Web Edition.
- [ ] Test duplicate website names after moving to production.
- [ ] Test GitHub Pages propagation and temporary 404 behavior.
- [ ] Perform security/abuse testing.

### Documentation / Release

- [ ] Update NOTES.md after M6 production deployment work.
- [ ] Update CHANGELOG.md after M6 production deployment work.
- [ ] Update TODO.md after M6 production deployment work.
- [ ] Commit the Website Generator changes to Git.
- [ ] Push the Website Generator repository to GitHub.
- [ ] Create and populate the separate private `WebsiteGenerator-Server` repository.
- [ ] Keep `WGwebsites` as the single public repository containing all generated websites.

### Future / Not Yet

- [ ] Consider GitHub Actions for CI/CD of the private deployment server.
- [ ] Consider always-on paid hosting when real usage requires it.
- [ ] New architecture ideas remain deferred to a future version.