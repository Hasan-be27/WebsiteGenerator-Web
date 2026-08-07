import Component from "../../app/Component.js";

export default class BusinessInformation extends Component {

    constructor(element) {

        super(element);

    }

    init() {

        this.name = this.$("#business-name");
        this.type = this.$("#business-type");
        this.phone = this.$("#business-phone");
        this.email = this.$("#business-email");
        this.address1 = this.$("#business-address-1");
        this.address2 = this.$("#business-address-2");
        this.city = this.$("#business-city");
        this.state = this.$("#business-state");
        this.pin = this.$("#business-pin");
        this.description = this.$("#business-description");

        this.registerEvents();

    }

    registerEvents() {

    }

    validate() {

        const valid =
            this.name.value.trim() !== "" &&
            this.phone.value.trim() !== "";

        return valid;

    }

    getData() {

        return {

            name: this.name.value.trim(),
            type: this.type.value.trim(),
            phone: this.phone.value.trim(),
            email: this.email.value.trim(),
            address1: this.address1.value.trim(),
            address2: this.address2.value.trim(),
            city: this.city.value.trim(),
            state: this.state.value.trim(),
            pin: this.pin.value.trim(),
            description: this.description.value.trim()

        };

    }

}