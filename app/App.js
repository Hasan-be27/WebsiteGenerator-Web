import Router from "./Router.js";
import ComponentLoader from "./ComponentLoader.js";
import HomePage from "../pages/HomePage.js";
import WebsiteDetailsPage from "../pages/WebsiteDetailsPage.js";
import PreviewPage from "../pages/PreviewPage.js";
import SuccessPage from "../pages/SuccessPage.js";
import ValidationService from "../services/ValidationService.js";
import GeneratorService from "../services/GeneratorService.js";
import StorageService from "../services/StorageService.js";
import TemplateService from "../services/TemplateService.js";
import ZipService from "../services/ZipService.js";
import GitHubService from "../services/GitHubService.js";
export default class App {

    constructor() {

        this.validationService =
            new ValidationService();

        this.componentLoader =
            new ComponentLoader(
                this.validationService
            );
        this.storageService =
            new StorageService();

        this.templateService =
            new TemplateService();

        this.zipService =
            new ZipService();

        this.githubService =
            new GitHubService();

        this.generatorService =
            new GeneratorService(
                this.componentLoader, 
                this.storageService, 
                this.templateService,
                this.zipService,
                this.githubService
            );

        this.router =
            new Router(this.componentLoader);

    }

    registerPages() {

        this.router.register(new HomePage());

        this.router.register(new WebsiteDetailsPage());

        this.router.register(new SuccessPage());

    }

    start() {

        console.log("Website Generator Web Started");

        this.registerPages();
        this.registerEvents();

        this.router.navigate("/");

    }
    registerEvents() {

        window.addEventListener("generate", async () => {

            this.setGenerationLoading(true);

            try {

                const result =
                    await this.generatorService.generate();

                this.generatedWebsite =
                    result;

                console.log(
                    "Website deployed:",
                    result
                );

                this.router.navigate(
                    "/success",
                    result
                );

            }

            catch (error) {

                console.error(
                    "Website deployment failed:",
                    error
                );

                alert(
                    error.message ||
                    "Website deployment failed. Please try again."
                );

            }

            finally {

                this.setGenerationLoading(false);

            }

        });

        window.addEventListener("save-local", async () => {

            const saveButton =
                document.getElementById("save-website-btn");

            if (saveButton) {

                saveButton.disabled = true;

            }

            try {

                await this.generatorService.saveLocal();

                window.dispatchEvent(
                    new CustomEvent("save-local-result", {
                        detail: {
                            success: true,
                            message: "Website saved successfully."
                        }
                    })
                );

            }

            catch (error) {

                if (error?.name === "AbortError") {

                    return;

                }

                console.error(
                    "Local website save failed:",
                    error
                );

                window.dispatchEvent(
                    new CustomEvent("save-local-result", {
                        detail: {
                            success: false,
                            message:
                                error.message ||
                                "Website could not be saved."
                        }
                    })
                );

            }

            finally {

                if (saveButton) {

                    saveButton.disabled = false;

                }

            }

        });
        window.addEventListener("navigate", (event) => {

            this.router.navigate(event.detail);

        });
        window.addEventListener("preview", async () => {

            try {

                const html =
                    await this.generatorService.preview();

                const baseURL =
                    new URL(
                        "./templates/default/",
                        window.location.href
                    ).href;

                const previewHTML =
                    `
                    <base href="${baseURL}">
                    ${html}
                    `;

                const blob =
                    new Blob(
                        [previewHTML],
                        {
                            type: "text/html"
                        }
                    );

                const url =
                    URL.createObjectURL(blob);

                window.open(
                    url,
                    "_blank"
                );

            }

            catch (error) {

                console.error(
                    "Preview failed:",
                    error
                );

            }

        });

    }

    setGenerationLoading(loading) {

        const existing =
            document.getElementById("generation-loader");

        if (!loading) {

            existing?.remove();
            return;

        }

        if (existing) {
            return;
        }

        const loader =
            document.createElement("div");

        loader.id = "generation-loader";
        loader.className = "generation-loader";
        loader.setAttribute("role", "status");
        loader.setAttribute("aria-live", "polite");
        loader.innerHTML = `
            <div class="generation-loader-card">
                <div class="spinner-border text-info" aria-hidden="true"></div>
                <h2>Publishing Your Website</h2>
                <p>
                    Please wait while your website is uploaded and published.
                    Do not close or leave this page.
                </p>
            </div>
        `;

        document.body.appendChild(loader);

    }

}