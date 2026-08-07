export default class WebsiteDetailsPage {

    constructor() {

        this.name = "Website Details";

        this.route = "/website";

        this.components = [
            "BusinessInformation",
            "Hero",
            "About",
            "Highlight",
            "Services",
            "Contact",
            "GenerateBar"
        ];

    }

}