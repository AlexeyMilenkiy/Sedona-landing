window.onload = function() {

    let mobileMenuIcon = document.querySelector('.mobile-menu');
    let mobileMenu = document.querySelector('.mobile-navigation');
    let closeMobMenu = document.querySelector('.close-mobile-nav');
    let navigation = document.querySelector('.header__nav');
    let tel = document.querySelector('#tel');
    const email = document.querySelector('#email');
    const errorMessageEmail = document.querySelector('.wrong-email');
    const errorMessageTel = document.querySelector('.wrong-number');
    const validate = require("validate.js");
    const form = document.querySelector(".main-form");

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
    };

    const Constraints = {
        name: {
            presence: true,
            length: { minimum: 3 }
        },
        surname: {
            presence: true,
            length: { minimum: 3 }
        },
        email: {
            email: false,
            presence: false
        },
    };

    validate(form.name.value, Constraints);

    let errorsname = validate(form.name.value, Constraints) || {};
    console.log('errors', errorsname.name);



    validate(form.surname.value, Constraints);

    let errorssurname = validate(form.surname.value, Constraints) || {};
    console.log('errors', errorssurname.surname);


    tel.addEventListener("change",() => {
        const req = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        let errors = validate(form.tel.value, Constraints) || {};
        console.log('errors', errors.tel);
        if (event.target.value.match(req)) {
            console.log(11111);
        } else {
            errorMessageTel.classList.remove('wrong-number');
            errorMessageTel.classList.add('wrong-number-visible');
        }
    });

    email.addEventListener("change",() => {
            let errors = validate(form.email.value, Constraints) || {};
            console.log('errors', errors.email);
            if (errors.email) {
              errorMessageEmail.classList.remove('wrong-email');
              errorMessageEmail.classList.add('wrong-email-visible');
            } else {
                console.log('email succes')
            }
    });


    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = {
            name: form.name.value,
            surname: form.surname.value,
            email: form.email.value,
            tel: form.tel.value
        };
        // validate.collectFormValues(formData)
    })
}