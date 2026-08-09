import Component from "../../app/Component.js";

export default class Preview extends Component {

    constructor(element) {

        super(element);

    }

    init(html) {

        console.log(
            "Preview initialized"
        );

        this.iframe =
            this.$("#website-preview");

        if (!html) {

            console.warn(
                "No generated website HTML received."
            );

            return;

        }

        this.render(html);

    }

    render(html) {

        this.iframe.srcdoc = html;

    }

}