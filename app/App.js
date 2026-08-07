import Router from "./Router.js";
import ComponentLoader from "./ComponentLoader.js";
import HomePage from "../pages/HomePage.js";
import WebsiteDetailsPage from "../pages/WebsiteDetailsPage.js";
import PreviewPage from "../pages/PreviewPage.js";
import SuccessPage from "../pages/SuccessPage.js";

export default class App {

    constructor() {

        this.componentLoader = new ComponentLoader();
        this.router = new Router(this.componentLoader);
    }

    registerPages() {

        this.router.register(new HomePage());

        this.router.register(new WebsiteDetailsPage());

        this.router.register(new PreviewPage());

        this.router.register(new SuccessPage());

    }

    start() {

        console.log("Website Generator Web Started");

        this.registerPages();
        this.registerEvents();

        this.router.navigate("/");

    }
    registerEvents() {

        window.addEventListener("navigate", (event) => {

            this.router.navigate(event.detail);

        });

    }

}