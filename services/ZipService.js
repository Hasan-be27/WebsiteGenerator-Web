export default class ZipService {

    async saveWebsite(html, data) {

        if (!window.showDirectoryPicker) {

            throw new Error(
                "This browser does not support folder selection."
            );

        }

        /*
         * Ask the user where the website should be saved.
         */
        const parentDirectory =
            await window.showDirectoryPicker({
                mode: "readwrite"
            });

        /*
         * Use the business name as the website folder name.
         */
        const businessName =
            data.business?.name?.trim() ||
            "website";

        const folderName =
            this.sanitizeName(businessName);

        const websiteDirectory =
            await parentDirectory.getDirectoryHandle(
                folderName,
                {
                    create: true
                }
            );

        /*
         * Create assets structure.
         */
        const assetsDirectory =
            await websiteDirectory.getDirectoryHandle(
                "assets",
                {
                    create: true
                }
            );

        const cssDirectory =
            await assetsDirectory.getDirectoryHandle(
                "css",
                {
                    create: true
                }
            );

        const jsDirectory =
            await assetsDirectory.getDirectoryHandle(
                "js",
                {
                    create: true
                }
            );

        const imagesDirectory =
            await assetsDirectory.getDirectoryHandle(
                "images",
                {
                    create: true
                }
            );

        /*
         * Save index.html.
         */
        await this.writeFile(
            websiteDirectory,
            "index.html",
            html
        );

        /*
         * Copy template CSS.
         */
        await this.copyTemplateFile(
            "templates/default/assets/css/style.css",
            cssDirectory,
            "style.css"
        );

        /*
         * Copy template JavaScript.
         */
        await this.copyTemplateFile(
            "templates/default/assets/js/script.js",
            jsDirectory,
            "script.js"
        );

        /*
         * Save uploaded images.
         */
        await this.saveImage(
            data.hero?.image,
            imagesDirectory,
            "hero"
        );

        await this.saveImage(
            data.about?.image,
            imagesDirectory,
            "about"
        );

        console.log(
            "Website saved successfully:",
            folderName
        );

        return websiteDirectory;

    }

    async copyTemplateFile(
        sourcePath,
        destinationDirectory,
        filename
    ) {

        const response =
            await fetch(sourcePath);

        if (!response.ok) {

            throw new Error(
                `Unable to copy template asset: ${sourcePath}`
            );

        }

        const content =
            await response.text();

        await this.writeFile(
            destinationDirectory,
            filename,
            content
        );

    }

    async saveImage(
        file,
        directory,
        name
    ) {

        if (!(file instanceof File)) {

            return;

        }

        const extension =
            this.getExtension(file.name);

        await this.writeFile(
            directory,
            `${name}${extension}`,
            file
        );

    }

    async writeFile(
        directory,
        filename,
        content
    ) {

        const fileHandle =
            await directory.getFileHandle(
                filename,
                {
                    create: true
                }
            );

        const writable =
            await fileHandle.createWritable();

        await writable.write(content);

        await writable.close();

    }

    getExtension(filename) {

        const index =
            filename.lastIndexOf(".");

        if (index === -1) {

            return "";

        }

        return filename.substring(index);

    }

    sanitizeName(name) {

        return name
            .replace(/[<>:"/\\|?*]/g, "")
            .trim() || "website";

    }

}