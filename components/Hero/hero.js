import Component from "../../app/Component.js";

export default class Hero extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("Hero initialized");

        this.title = this.$("#hero-title");
        this.tagline = this.$("#hero-tagline");

        this.heroImagebutton = this.$("#hero-image");
        this.heroPreview = this.$("#hero-preview");
        this.heroImageName = this.$("#hero-image-name");

        this.registerEvents();

    }

    registerEvents() {

        // We'll implement image upload in M3

    }

    validate() {

        return true;

    }

    getData() {

        return {

            image: null,

            title: this.title.value.trim(),

            tagline: this.tagline.value.trim()

        };

    }

}