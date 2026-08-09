export default class TemplateService {

    constructor() {

        this.templatePath =
            "templates/default/index.hbs";

        this.partialsPath =
            "templates/default/partials/";

        this.partials = [
            "navbar",
            "hero",
            "about",
            "highlight",
            "services",
            "contact",
            "footer"
        ];

    }

    async loadTemplate() {

        const response =
            await fetch(this.templatePath);

        if (!response.ok) {

            throw new Error(
                `Unable to load template: ${this.templatePath}`
            );

        }

        return response.text();

    }

    async loadPartials() {

        const partials = {};

        for (const name of this.partials) {

            const path =
                `${this.partialsPath}${name}.hbs`;

            const response =
                await fetch(path);

            if (!response.ok) {

                throw new Error(
                    `Unable to load partial: ${path}`
                );

            }

            partials[name] =
                await response.text();

        }

        return partials;

    }

    async render(data) {

        if (typeof Handlebars === "undefined") {

            throw new Error(
                "Handlebars is not available."
            );

        }

        const template =
            await this.loadTemplate();

        const partials =
            await this.loadPartials();

        for (const [name, content] of Object.entries(partials)) {

            Handlebars.registerPartial(
                name,
                content
            );

        }

        const compiled =
            Handlebars.compile(template);

        return compiled(data);

    }

}