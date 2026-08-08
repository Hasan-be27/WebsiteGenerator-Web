import Component from "../../app/Component.js";

export default class Contact extends Component {

    constructor(element) {
        super(element);
    }

    init() {

        console.log("Contact initialized");

        this.contactMode = this.$("#contact-mode");

        this.emailGroup = this.$("#email-group");
        this.whatsappGroup = this.$("#whatsapp-group");

        this.contactEmail = this.$("#contact-email");
        this.contactWhatsapp = this.$("#contact-whatsapp");

        this.updateMode();

        this.registerEvents();
        this.validationService.register(
            "contact",
            () => this.validate()
        );

    }

    registerEvents() {

        this.contactMode.addEventListener("change", () => {

            this.updateMode();

            this.validationService.validate("contact");

        });

        this.contactEmail.addEventListener("input", () => {

            this.validationService.validate("contact");

        });

        this.contactWhatsapp.addEventListener("input", () => {

            this.validationService.validate("contact");

        });

    }

    updateMode() {

        const mode = this.contactMode.value;

        this.emailGroup.style.display =
            mode === "email" || mode === "both"
                ? ""
                : "none";

        this.whatsappGroup.style.display =
            mode === "whatsapp" || mode === "both"
                ? ""
                : "none";

    }

    validate() {

        const mode = this.contactMode.value;

        const emailValid =
            this.contactEmail.value.trim() !== "";

        const whatsappValid =
            this.contactWhatsapp.value.trim() !== "";

        if (mode === "email") {

            return emailValid;

        }

        if (mode === "whatsapp") {

            return whatsappValid;

        }

        if (mode === "both") {

            return emailValid && whatsappValid;

        }

        return false;

    }

    getData() {

        return {

            mode: this.contactMode.value,

            email: this.contactEmail.value.trim(),

            whatsapp: this.contactWhatsapp.value.trim()

        };

    }

}