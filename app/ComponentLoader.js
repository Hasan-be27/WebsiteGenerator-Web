export default class ComponentLoader {
    constructor() {

        this.loadedStyles = new Set();
        this.loadedModules = new Map();

    }

    async load(page) {

        const app = document.getElementById("app");

        app.innerHTML = "";

        for (const component of page.components) {

            await this.loadComponent(component, app);

        }

    }

    async loadComponent(componentName, container) {

        this.loadCSS(componentName);

        const fileName = componentName.toLowerCase();

        const htmlPath = `components/${componentName}/${fileName}.html`;

        try {

            const response = await fetch(htmlPath);

            if (!response.ok) {

                throw new Error(`Unable to load ${htmlPath}`);

            }

            const html = await response.text();

            container.insertAdjacentHTML("beforeend", html);

            const element = container.lastElementChild;

            const Component = await this.loadJS(componentName);

            const component = new Component(element);

            component.init();

        }

        catch (error) {

            console.error(error);

        }

    }
    loadCSS(componentName) {

        const fileName = componentName.toLowerCase();

        const cssPath = `components/${componentName}/${fileName}.css`;

        if (this.loadedStyles.has(cssPath)) {

            return;

        }

        const link = document.createElement("link");

        link.rel = "stylesheet";

        link.href = cssPath;

        document.head.appendChild(link);

        this.loadedStyles.add(cssPath);

    }
    async loadJS(componentName) {

        const fileName = componentName.toLowerCase();

        const jsPath = `../components/${componentName}/${fileName}.js`;

        if (this.loadedModules.has(jsPath)) {

            return this.loadedModules.get(jsPath);

        }

        const module = await import(jsPath);

        this.loadedModules.set(jsPath, module.default);

        return module.default;

    }

}