export default class StorageService {

    constructor(key = "website-generator-data") {

        this.key = key;

    }

    save(data) {

        localStorage.setItem(
            this.key,
            JSON.stringify(data)
        );

    }

    load() {

        const data =
            localStorage.getItem(this.key);

        if (!data) {

            return null;

        }

        try {

            return JSON.parse(data);

        }

        catch (error) {

            console.error(
                "Failed to parse stored website data.",
                error
            );

            return null;

        }

    }

    clear() {

        localStorage.removeItem(this.key);

    }

}