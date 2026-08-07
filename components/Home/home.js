import Component from "../../app/Component.js";

export default class Home extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("Home initialized");

        this.registerEvents();

    }

    registerEvents() {

        const button = this.$("#new-project");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            this.emit("navigate", "/website");

        });

    }

}