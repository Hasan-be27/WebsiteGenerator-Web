const navbar = document.querySelector(".navbar");

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 60
    );

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < top + height
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
const navbarCollapse = document.querySelector(".navbar-collapse");

document.querySelectorAll(".navbar .nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (navbarCollapse.classList.contains("show")) {

            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();

        }

    });

});
/* ==========================================
   CONTACT FORM
========================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("contact-name").value.trim();

        const email =
            document.getElementById("contact-email-input").value.trim();

        const message =
            document.getElementById("contact-message").value.trim();

        const text =

`Name: ${name}

Email: ${email}

Message:
${message}`;

        const config = window.contactConfig;

        switch (config.mode) {

            case "email":

                sendEmail(config.email, text);
                break;

            case "whatsapp":

                sendWhatsapp(config.whatsapp, text);
                break;

            case "both":

                showContactModal(
                    config,
                    text
                );

                break;

        }

    });

}

function sendEmail(address, body) {

    const subject =
        encodeURIComponent("Website Inquiry");

    body =
        encodeURIComponent(body);

    const link =
        document.createElement("a");

    link.href =
        `mailto:${address}?subject=${subject}&body=${body}`;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

function sendWhatsapp(number, body) {

    body =
        encodeURIComponent(body);

    window.open(
        `https://wa.me/${number}?text=${body}`,
        "_blank"
    );

}
function showContactModal(config, body) {

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "contactChoiceModal"
            )
        );

    modal.show();

    document.getElementById(
        "contact-email-btn"
    ).onclick = () => {

        modal.hide();

        sendEmail(
            config.email,
            body
        );

    };

    document.getElementById(
        "contact-whatsapp-btn"
    ).onclick = () => {

        modal.hide();

        sendWhatsapp(
            config.whatsapp,
            body
        );

    };

}