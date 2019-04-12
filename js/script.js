window.onload = function() {

    let mobileMenuIcon = document.querySelector('.mobile-menu');
    let mobileMenu = document.querySelector('.mobile-navigation');
    let closeMobMenu = document.querySelector('.close-mobile-nav');
    let navigation = document.querySelector('.header__nav');
    const Name = document.getElementById('name');
    const surName = document.getElementById('surname');
    const tel = document.querySelector('#tel');
    const email = document.querySelector('#email');
    const errorMessageEmail = document.querySelector('.wrong-email');
    const errorMessageTel = document.querySelector('.wrong-number');
    // const validate = require("validate.js");
    const form = document.querySelector(".main-form");
    let inputs  = form.querySelectorAll("input[type=text], input[type=email]");

    console.log(inputs);let i=0;


    var validator = new FormValidator('form', [{
        name: 'name',
        display: 'required',
        rules: 'required'
    }, {
        name: 'surname',
        display: 'required',
        rules: 'required'
    },  {
        name: 'email',
        display: 'required',
        rules: 'valid_email'
    }, {
        name: 'telephone',
        display: 'min length',
        rules: 'min_length[8]'
    }], function(errors) {
        if (errors.length > 0) {
            // Show the errors
            console.log(errors);
            Name.classList.remove('review-user__input');
            Name.classList.add('has-error-review-user__input');
            console.log(errors[i].id);
           for(; i<errors.length; i++){
               return errors[i].id
           }
        }
    });

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
    };


    const formData = {
        name: form.name,
        surname: form.surname,
        email: form.email
        // tel: form.tel
    };

    // // подключение формы
    // form.addEventListener('submit', event => {
    //     event.preventDefault();
    //
    //     // handleFormSubmit(form);
    // });


    // validate(form.name.value, Constraints,{format: "flat"});
    //
    // validate(form.name.value, Constraints);
    // // console.log('errors', errorsname.name);
    //
    //
    //
    // validate(form.surname.value, Constraints);
    //
    // let errorssurname = validate(form.surname.value, Constraints) || {};
    // console.log('errors', errorssurname.surname);
    //
    //
    // tel.addEventListener("change",() => {
    //     const req = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    //     let errors = validate(form.tel.value, Constraints) || {};
    //     console.log('errors', errors.tel);
    //     if (event.target.value.match(req)) {
    //         console.log(11111);
    //     } else {
    //         errorMessageTel.classList.remove('wrong-number');
    //         errorMessageTel.classList.add('wrong-number-visible');
    //     }
    // });
    //
    // email.addEventListener("change",() => {
    //         let errors = validate(form.email.value, Constraints) || {};
    //         console.log('errors', errors.email);
    //         if (errors.email) {
    //           errorMessageEmail.classList.remove('wrong-email');
    //           errorMessageEmail.classList.add('wrong-email-visible');
    //         } else {
    //             console.log('email succes')
    //         }
    // });
}