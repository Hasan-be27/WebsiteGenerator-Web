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
                    class="btn btn-outline-danger btn-sm remove-service">

                    Remove

                </button>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    <i class="bi bi-tag me-2"></i>
                    Service Name
                </label>

                <input
                    type="text"
                    class="form-control service-name">

            </div>

            <div>

                <label class="form-label">
                    <i class="bi bi-text-paragraph me-2"></i>
                    Description
                </label>

                <textarea
                    class="form-control service-description"
                    rows="3"></textarea>

            </div>
        `;

        service.querySelector(".remove-service")
            .addEventListener("click", () => {

                if (this.list.children.length === 1) {

                    return;

                }

                service.remove();

                this.renumber();

            });
        const nameInput = service.querySelector(".service-name");
        const descriptionInput = service.querySelector(".service-description");

        nameInput.addEventListener("input", () => {

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

        return [...this.list.children].some(service => {

            const name =
                service.querySelector(".service-name").value.trim();

            const description =
                service.querySelector(".service-description").value.trim();

            return name !== "" && description !== "";

        });

    }

    getData() {

        return [...this.list.children].map(service => ({

            name: service.querySelector(".service-name").value.trim(),

            description: service.querySelector(".service-description").value.trim()

        }));

    }

}