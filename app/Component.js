export default class Component {

    constructor(element) {

        this.element = element;

    }

    $(selector) {

        return this.element.querySelector(selector);

    }

    $$(selector) {

        return this.element.querySelectorAll(selector);

    }

    show(selector) {

        this.$(selector)?.classList.remove("d-none");

    }

    hide(selector) {

        this.$(selector)?.classList.add("d-none");

    }

    value(selector) {

        return this.$(selector)?.value;

    }
    text(selector, value) {

        this.$(selector).textContent = value;

    }
    html(selector, value) {

        this.$(selector).innerHTML = value;

    }

}