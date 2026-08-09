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

        this.generatorService =
            new GeneratorService(
                this.componentLoader, 
                this.storageService, 
                this.templateService,
                this.zipService
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

            try {

                const result =
                    await this.generatorService.generate();

                this.generatedWebsite =
                    result;

                console.log(
                    "Generated website:",
                    result
                );

            }

            catch (error) {

                console.error(
                    "Website generation failed:",
                    error
                );

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
    

}