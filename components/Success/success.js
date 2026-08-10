import Component from "../../app/Component.js";

export default class Success extends Component {

    constructor(element) {

        super(element);

    }

    init(data = null) {

        console.log("Success initialized");

        this.websiteURL =
            this.$("#success-website-url");

        this.openWebsiteButton =
            this.$("#open-website-btn");

        this.saveWebsiteButton =
            this.$("#save-website-btn");

        this.homeButton =
            this.$("#home-btn");

        this.saveStatus =
            this.$("#save-website-status");

        const url =
            data?.url || "#";

        this.websiteURL.textContent =
            data?.url || "Website URL unavailable";

        this.websiteURL.href =
            url;

        this.openWebsiteButton.href =
            url;

        this.registerEvents();

    }

    registerEvents() {

        this.saveWebsiteButton.addEventListener("click", () => {

            this.emit("save-local");

        });

        this.homeButton.addEventListener("click", () => {

            this.emit("navigate", "/");

        });

        window.addEventListener(
            "save-local-result",
            this.handleSaveResult
        );

    }

    handleSaveResult = (event) => {

        const { success, message } =
            event.detail || {};

        if (!this.saveStatus) {
            return;
        }

        this.saveStatus.textContent =
            message ||
            (success
                ? "Website saved successfully."
                : "Website was not saved.");

        this.saveStatus.classList.remove("d-none");

    };

}
