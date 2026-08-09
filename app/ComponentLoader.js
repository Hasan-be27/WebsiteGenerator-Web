export default class ComponentLoader {

    constructor(validationService) {

        this.validationService = validationService;

        this.loadedStyles = new Set();
        this.loadedModules = new Map();
        this.components = new Map();

    }

    async load(page, data=null) {

        const container = document.getElementById("app");

        container.innerHTML = "";

        this.components.clear();

        for (const component of page.components) {

            console.log(`Loading component "${component}"...`);

            await this.loadComponent(component, container, data);

        }

    }

    async loadComponent(componentName, container, data=null) {

        console.group(`Component: ${componentName}`);

        this.loadCSS(componentName);

        const fileName = componentName.toLowerCase();

        const htmlPath =
            `components/${componentName}/${fileName}.html`;

        try {

            const response = await fetch(htmlPath);

            if (!response.ok) {

                throw new Error(`Unable to load ${htmlPath}`);

            }

            const html = await response.text();

            container.insertAdjacentHTML(
                "beforeend",
                html
            );

            const element =
                container.lastElementChild;

            const Component =
                await this.loadJS(componentName);

            const component =
                new Component(element);

            component.validationService =
                this.validationService;

            console.log(
                `${componentName} validation service:`,
                component.validationService
            );

            component.init(data);

            this.components.set(
                componentName,
                component
            );

        }

        catch (error) {

            console.error(
                `❌ Component "${componentName}" could not be loaded.`
            );

            console.error(error.message);

        }

        finally {

            console.groupEnd();

        }

    }

    getComponent(componentName) {

        return this.components.get(componentName);

    }

    getComponents() {

        return this.components;

    }

    loadCSS(componentName) {

        const fileName =
            componentName.toLowerCase();

        const cssPath =
            `components/${componentName}/${fileName}.css`;

        if (this.loadedStyles.has(cssPath)) {

            return;

        }

        const link =
            document.createElement("link");

        link.rel = "stylesheet";
        link.href = cssPath;

        link.onload = () => {

            console.log(
                `CSS loaded: ${cssPath}`
            );

        };

        link.onerror = () => {

            console.error(
                `❌ CSS failed to load: ${cssPath}`
            );

        };

        document.head.appendChild(link);

        this.loadedStyles.add(cssPath);

    }

    async loadJS(componentName) {

        const fileName =
            componentName.toLowerCase();

        const jsPath =
            `../components/${componentName}/${fileName}.js`;

        if (this.loadedModules.has(jsPath)) {

            return this.loadedModules.get(jsPath);

        }

        const module =
            await import(jsPath);

        this.loadedModules.set(
            jsPath,
            module.default
        );

        return module.default;

    }

}