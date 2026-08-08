export default class ComponentLoader {
    constructor(validationService) {

        this.validationService = validationService;

        this.loadedStyles = new Set();
        this.loadedModules = new Map();

    }

    async load(page) {

        const container = document.getElementById("app");

        container.innerHTML = "";

        for (const component of page.components) {

            console.log(`Loading component "${component}"...`);

            await this.loadComponent(component, container);

        }

    }

    async loadComponent(componentName, container) {
        console.group(`Component: ${componentName}`);

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

            component.validationService = this.validationService;
            console.log(
                `${componentName} validation service:`,
                component.validationService
            );
            component.init();


        }

        catch (error) {

            console.error(`❌ Component "${componentName}" could not be loaded.`);

            console.error(error.message);

        }
        finally {

            console.groupEnd();

        }

    }
    loadCSS(componentName) {

    const fileName = componentName.toLowerCase();

    const cssPath =
        `components/${componentName}/${fileName}.css`;

    if (this.loadedStyles.has(cssPath)) {

        return;

    }

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = cssPath;

    link.onload = () => {

        console.log(`CSS loaded: ${cssPath}`);

    };

    link.onerror = () => {

        console.error(`❌ CSS failed to load: ${cssPath}`);

    };

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