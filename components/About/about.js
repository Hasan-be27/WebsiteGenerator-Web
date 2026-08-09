import Component from "../../app/Component.js";
import ImageUploader from "../../app/ImageUploader.js";

export default class About extends Component {

    constructor(element) {
        super(element);
    }

    init() {

        console.log("About initialized");
        

        this.heading =
            this.$("#about-heading");

        this.description =
            this.$("#about-description");

        this.imageUploader =
            new ImageUploader(this, "about");

        this.validationService.register(
            "about",
            () => this.validate()
        );

        this.imageUploader.onChange(() => {

            this.validationService.validate("about");

        });

        this.registerEvents();

    }

    registerEvents() {

        this.heading.addEventListener("input", () => {

            this.validationService.validate("about");

        });

        this.description.addEventListener("input", () => {

            this.validationService.validate("about");

        });

    }

    validate() {

        return (
            this.heading.value.trim() !== "" &&
            this.description.value.trim() !== "" &&
            this.imageUploader.hasImage()
        );

    }

    getData() {

        return {

            heading: this.heading.value.trim(),

            description: this.description.value.trim(),

            image: this.imageUploader.getImage()

        };

    }

}