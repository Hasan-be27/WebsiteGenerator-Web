export default class Router {

    constructor(componentLoader) {

        this.pages = [];

        this.componentLoader = componentLoader;

    }

    register(page) {

        this.pages.push(page);

    }

    navigate(route, data = null) {

        const page =
            this.pages.find(
                page => page.route === route
            );

        if (!page) {

            console.error(
                `Route "${route}" not found.`
            );

            return;

        }

        console.log(
            `Navigating to "${page.name}"`
        );

        this.componentLoader.load(
            page,
            data
        );

    }

}