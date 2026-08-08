export default class ValidationService {

    constructor() {

        this.sections = new Map();
        this.listeners = new Set();

    }

    register(section, validator) {

        this.sections.set(section, {
            validator,
            valid: false
        });

        this.validate(section);

    }

    validate(section) {

        const entry = this.sections.get(section);

        if (!entry) {
            return false;
        }

        entry.valid = Boolean(entry.validator());

        this.notify();

        return entry.valid;

    }

    validateAll() {

        for (const section of this.sections.keys()) {

            this.validate(section);

        }

        return this.isValid();

    }

    isValid() {

        if (this.sections.size === 0) {
            return false;
        }

        return [...this.sections.values()]
            .every(section => section.valid);

    }

    invalidSections() {

        return [...this.sections.entries()]
            .filter(([, section]) => !section.valid)
            .map(([name]) => name);

    }

    subscribe(listener) {

        this.listeners.add(listener);

        return () => {

            this.listeners.delete(listener);

        };

    }

    notify() {

        const state = {
            valid: this.isValid(),
            invalidSections: this.invalidSections()
        };

        this.listeners.forEach(listener => listener(state));

    }

}