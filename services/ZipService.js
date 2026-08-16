export default class ZipService {

    async saveWebsite(
        html,
        data,
        servicePages = []
    ) {

        if (!window.showDirectoryPicker) {

            return await this.downloadZip(html, data);

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
        const servicesDirectory =
            await websiteDirectory.getDirectoryHandle(
                "services",
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
        const servicesImagesDirectory =
            await imagesDirectory.getDirectoryHandle(
                "services",
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
        for (const page of servicePages) {

            await this.writeFile(
                servicesDirectory,
                page.path.replace(
                    "services/",
                    ""
                ),
                page.content
            );

        }

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
        for (
            let index = 0;
            index < (data.services || []).length;
            index++
        ) {

            const service =
                data.services[index];

            await this.saveImage(
                service.image,
                servicesImagesDirectory,
                `service-${index}`
            );

        }

        console.log(
            "Website saved successfully:",
            folderName
        );

        return websiteDirectory;

    }
    async downloadZip(html, data) {

        if (!window.JSZip) {

            throw new Error(
                "ZIP download is unavailable."
            );

        }

        const files =
            await this.getWebsiteFiles(
                html,
                data
            );

        const zip =
            new window.JSZip();

        for (const file of files) {

            if (file.encoding === "base64") {

                zip.file(
                    file.path,
                    file.content,
                    {
                        base64: true
                    }
                );

            } else {

                zip.file(
                    file.path,
                    file.content
                );

            }

        }

        const zipBlob =
            await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6
                }
            });

        const businessName =
            data.business?.name?.trim() ||
            "website";

        const filename =
            `${this.sanitizeName(businessName)}.zip`;

        const url =
            URL.createObjectURL(zipBlob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

        console.log(
            "Website ZIP downloaded:",
            filename
        );

        return filename;

    }

    async getWebsiteFiles(
    html,
    data,
    servicePages = []
) {

        const files = [
            {
                path: "index.html",
                content: html,
                encoding: "utf8"
            },
            {
                path: "assets/css/style.css",
                content: await this.getTemplateText(
                    "templates/default/assets/css/style.css"
                ),
                encoding: "utf8"
            },
            {
                path: "assets/js/script.js",
                content: await this.getTemplateText(
                    "templates/default/assets/js/script.js"
                ),
                encoding: "utf8"
            }
        ];
        files.push(
            ...servicePages
        );

        const images = [
            {
                file: data.hero?.image,
                pathPrefix: "assets/images/hero"
            },
            {
                file: data.about?.image,
                pathPrefix: "assets/images/about"
            }
        ];

        for (const image of images) {

            if (!(image.file instanceof File)) {
                continue;
            }

            files.push({
                path:
                    `${image.pathPrefix}${this.getExtension(image.file.name)}`,
                content:
                    await this.fileToBase64(image.file),
                encoding: "base64"
            });

        }
        for (
            let index = 0;
            index < (data.services || []).length;
            index++
        ) {

            const service =
                data.services[index];

            if (!(service.image instanceof File)) {

                continue;

            }

            files.push({

                path:
                    `assets/images/services/service-${index}` +
                    this.getExtension(
                        service.image.name
                    ),

                content:
                    await this.fileToBase64(
                        service.image
                    ),

                encoding:
                    "base64"

            });

        }

        return files;

    }

    async getTemplateText(sourcePath) {

        const response =
            await fetch(sourcePath);

        if (!response.ok) {

            throw new Error(
                `Unable to load template asset: ${sourcePath}`
            );

        }

        return await response.text();

    }

    async fileToBase64(file) {

        const buffer =
            await file.arrayBuffer();

        let binary = "";
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;

        for (
            let index = 0;
            index < bytes.length;
            index += chunkSize
        ) {

            binary += String.fromCharCode(
                ...bytes.subarray(
                    index,
                    Math.min(index + chunkSize, bytes.length)
                )
            );

        }

        return btoa(binary);

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