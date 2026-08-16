import Component from "../../app/Component.js";

export default class Services extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        console.log("Services initialized");

        this.list = this.$("#services-list");
        this.addButton = this.$("#add-service");

        this.registerEvents();

        this.validationService.register(
            "services",
            () => this.validate()
        );

        // Start with one empty service
        this.addService();

    }

    registerEvents() {

        this.addButton.addEventListener("click", () => {

            this.addService();

        });

    }

    renumber() {

        [...this.list.children].forEach((service, index) => {

            service.querySelector(".service-title").textContent =
                `Service ${index + 1}`;

        });

    }

    addService() {

        const service = document.createElement("div");

        service.className = "service-item card border p-3";

        service.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">

                <h5 class="service-title mb-0">
                    Service ${this.list.children.length + 1}
                </h5>

                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm remove-service">

                    Remove

                </button>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    <i class="bi bi-image me-2"></i>
                    Service Image
                    <span class="text-danger">*</span>
                </label>

                <input
                    type="file"
                    class="form-control service-image"
                    accept="image/*">

                <div class="service-image-preview-container mt-3 d-none">

                    <img
                        class="service-image-preview"
                        alt="Service image preview">

                </div>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    <i class="bi bi-tag me-2"></i>
                    Service Name
                    <span class="text-danger">*</span>
                </label>

                <input
                    type="text"
                    class="form-control service-name">

            </div>

            <div class="mb-3">

                <label class="form-label">
                    <i class="bi bi-text-paragraph me-2"></i>
                    Brief Description
                    <span class="text-danger">*</span>
                </label>

                <textarea
                    class="form-control service-brief"
                    rows="2"
                    placeholder="A short description shown on the home page."></textarea>

            </div>

            <div>

                <label class="form-label">
                    <i class="bi bi-file-text me-2"></i>
                    Detailed Description
                    <span class="text-danger">*</span>
                </label>

                <textarea
                    class="form-control service-description"
                    rows="5"
                    placeholder="A detailed description shown on the service page."></textarea>

            </div>
        `;

        const removeButton =
            service.querySelector(".remove-service");

        removeButton.addEventListener("click", () => {

            if (this.list.children.length === 1) {

                return;

            }

            service.remove();

            this.renumber();

            this.validationService.validate("services");

        });

        const imageInput =
            service.querySelector(".service-image");

        const imagePreviewContainer =
            service.querySelector(".service-image-preview-container");

        const imagePreview =
            service.querySelector(".service-image-preview");

        const nameInput =
            service.querySelector(".service-name");

        const briefInput =
            service.querySelector(".service-brief");

        const descriptionInput =
            service.querySelector(".service-description");

        imageInput.addEventListener("change", () => {

            const file = imageInput.files[0];

            if (!file) {

                imagePreviewContainer.classList.add("d-none");

                imagePreview.removeAttribute("src");

                this.validationService.validate("services");

                return;

            }

            imagePreview.src =
                URL.createObjectURL(file);

            imagePreviewContainer.classList.remove("d-none");

            this.validationService.validate("services");

        });

        nameInput.addEventListener("input", () => {

            this.validationService.validate("services");

        });

        briefInput.addEventListener("input", () => {

            this.validationService.validate("services");

        });

        descriptionInput.addEventListener("input", () => {

            this.validationService.validate("services");

        });

        this.list.appendChild(service);

    }

    validate() {

        if (this.list.children.length === 0) {

            return false;

        }

        return [...this.list.children].every(service => {

            const image =
                service.querySelector(".service-image").files[0];

            const name =
                service.querySelector(".service-name").value.trim();

            const brief =
                service.querySelector(".service-brief").value.trim();

            const description =
                service.querySelector(".service-description").value.trim();

            return Boolean(
                image &&
                name &&
                brief &&
                description
            );

        });

    }

    getData() {

        return [...this.list.children].map(service => ({

            name:
                service
                    .querySelector(".service-name")
                    .value
                    .trim(),

            brief:
                service
                    .querySelector(".service-brief")
                    .value
                    .trim(),

            description:
                service
                    .querySelector(".service-description")
                    .value
                    .trim(),

            image:
                service
                    .querySelector(".service-image")
                    .files[0] || null

        }));

    }

}