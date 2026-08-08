import Component from "../../app/Component.js";

export default class GenerateBar extends Component {

    constructor(element) {
        super(element);
    }

    init() {

        console.log("GenerateBar initialized");

        this.generateButton = this.$("#generate-website-btn");
        this.previewButton = this.$("#preview-btn");
        this.status = this.$(".generate-status");

        this.registerEvents();

        this.update();

    }

    registerEvents() {

        this.generateButton.addEventListener("click", () => {

            console.log("Generate Website clicked");

            // M3:
            // this.emit("generate");

        });

        this.previewButton.addEventListener("click", () => {

            console.log("Preview clicked");

            // M4:
            // this.emit("preview");

        });

        this.validationService.subscribe(() => {

            this.update();

        });

    }

    update() {

        const valid = this.validationService.isValid();

        this.generateButton.disabled = !valid;

        if (valid) {

            this.status.textContent =
                "✓ All required fields complete";

            return;

        }

        const invalidSections =
            this.validationService.invalidSections();

        const sectionNames = {
            "business-information": "Business Information",
            "hero": "Hero",
            "about": "About",
            "services": "Services",
            "contact": "Contact"
        };

        const names = invalidSections.map(section =>
            sectionNames[section] || section
        );

        this.status.textContent =
            `⚠ Incomplete: ${names.join(", ")}`;

    }

}