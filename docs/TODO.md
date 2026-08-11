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


# TODO

## Current

- [x] Test the favicon on the public GitHub Pages Web Edition.
- [x] Test mobile ZIP download on a physical mobile device when available.
- [x] Test the complete production flow again after pushing the latest changes.
- [x] Confirm the public Web Edition downloads correctly after GitHub Pages redeployment.
- [x] Update documentation after the current changes are committed.

---

## Testing / Reliability

- [ ] Test deployment with normal realistic website data.
- [ ] Test deployment with unusual/special characters in business names.
- [ ] Test duplicate website names repeatedly.
- [ ] Test very large uploaded images.
- [ ] Test deployment failure handling.
- [ ] Test Render cold-start delay behavior.
- [ ] Test GitHub Pages publishing delay and Success page messaging.
- [ ] Test ZIP download with hero image.
- [ ] Test ZIP download with about image.
- [ ] Test ZIP download with both images.
- [ ] Test ZIP download without optional images.
- [ ] Test ZIP extraction and verify the generated website works locally.

---

## Production Polish

- [ ] Review Success page messaging and deployment status presentation.
- [ ] Review loading state during deployment.
- [ ] Review mobile layout across all pages.
- [ ] Review favicon appearance in browser tabs.
- [ ] Review error messages for non-technical users.
- [ ] Review public Web Edition before final release.

---

## Future Improvements

- [ ] Improve deployment progress/status feedback.
- [ ] Consider a more reliable way of detecting when GitHub Pages has finished publishing.
- [ ] Consider custom domains for generated websites.
- [ ] Consider additional website templates.
- [ ] Consider additional hosting providers.
- [ ] Consider future architecture improvements only in a future version.

---

## Completed

- [x] Locked Web Edition architecture.
- [x] Migrated/adapted UI components.
- [x] Implemented website details form.
- [x] Implemented validation.
- [x] Implemented preview.
- [x] Implemented local website generation.
- [x] Implemented website download/export.
- [x] Implemented GitHub App deployment.
- [x] Implemented automatic GitHub hosting.
- [x] Created `WGwebsites` repository for generated websites.
- [x] Created separate deployment server repository.
- [x] Deployed deployment server to Render.
- [x] Published Web Edition through GitHub Pages.
- [x] Connected Web Edition to production deployment server.
- [x] Configured production CORS.
- [x] Added duplicate website name handling.
- [x] Added deployment loading state.
- [x] Added Success page deployment messaging.
- [x] Added favicon.
- [x] Added mobile/unsupported-browser ZIP fallback.