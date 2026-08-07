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

    }

    registerEvents() {

        this.mode.addEventListener("change", () => {

            this.updateMode();

        });

    }

    updateMode() {

        const mode = this.mode.value;

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

        return true;

    }

    getData() {

        return {

            mode: this.mode.value,

            email: this.email.value.trim(),

            whatsapp: this.whatsapp.value.trim()

        };

    }

}