import Component from "../../app/Component.js";

export default class Highlight extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("Highlight initialized");

        this.tagline = this.$("#highlight-tagline");

        this.registerEvents();

    }

    registerEvents() {

        // No events needed yet

    }

    validate() {

        return true;

    }

    getData() {

        return {

            tagline: this.tagline.value.trim()

        };

    }

}