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

        this.button.addEventListener("click", () => {

            console.log("Generate Website clicked");

            // M3:
            // this.emit("generate");

        });

        this.previewButton.addEventListener("click", () => {

            console.log("Preview clicked");

            // M4:
            // this.emit("preview");

        });

    }

    update() {

        this.button.disabled = false;

        this.status.textContent =
            "✓ Framework ready";

    }

}