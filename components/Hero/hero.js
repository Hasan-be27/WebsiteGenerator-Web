import Component from "../../app/Component.js";
import ImageUploader from "../../app/ImageUploader.js";

export default class Hero extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("Hero initialized");

        this.title = this.$("#hero-title");
        this.tagline = this.$("#hero-tagline");

        this.imageUploader =
            new ImageUploader(this, "hero");

        this.validationService.register(
            "hero",
            () => this.validate()
        );

        this.imageUploader.onChange(() => {

            this.validationService.validate("hero");

        });

        this.registerEvents();

    }

    registerEvents() {

        // Hero-specific events will go here

    }

    validate() {

        return this.imageUploader.hasImage();

    }

    getData() {

        return {

            image: this.imageUploader.getImage(),

            title: this.title.value.trim(),

            tagline: this.tagline.value.trim()

        };

    }

}