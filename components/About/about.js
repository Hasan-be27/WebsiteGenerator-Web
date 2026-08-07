import Component from "../../app/Component.js";

export default class About extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("About initialized");

        this.heading = this.$("#about-heading");
        this.description = this.$("#about-description");

        this.aboutImageButton = this.$("#about-image-button");
        this.aboutImageInput = this.$("#about-image-input");
        this.aboutImageName = this.$("#about-image-name");
        this.aboutPreview = this.$("#about-preview");

        this.registerEvents();

    }

    registerEvents() {

        // Image upload will be implemented in M3

    }

    validate() {

        return true;

    }

    getData() {

        return {

            heading: this.heading.value.trim(),
            description: this.description.value.trim(),
            image: null

        };

    }

}