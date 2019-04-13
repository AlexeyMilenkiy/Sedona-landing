window.onload = function() {
  let mobileMenuIcon = document.querySelector('.mobile-menu');
  let mobileMenu = document.querySelector('.mobile-navigation');
  let closeMobMenu = document.querySelector('.close-mobile-nav');
  let navigation = document.querySelector('.header__nav');
  const name = document.getElementById('name');
  const surName = document.getElementById('surname');
  const tel = document.querySelector('#tel');
  const email = document.querySelector('#email');
  const errorMessageEmail = document.querySelector('.wrong-email');
  const errorMessageTel = document.querySelector('.wrong-number');
  let validate = require("validate-js");
  const form = document.querySelector(".main-form");
  
  let validator = new validate('form', [{
        name: 'name',
        display: 'required',
        rules: 'required'
    }, {
        name: 'surname',
        display: 'required',
        rules: 'required'
    }, {
        name: 'telephone',
        display: 'Telephone No',
        rules: 'required|callback_check_phone'
    }, {
        name: 'email',
        display: 'Email No',
        rules: 'required|valid_email'
    }], function(errors) {
      clearErrors();
        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].id === "name") {
                    name.classList.remove("review-user__input");
                    name.classList.add("error");
                } else if (errors[i].id === 'surname') {
                    surName.classList.remove("review-user__input");
                    surName.classList.add("error");
                } else if (errors[i].id === 'tel') {
                    errorMessageTel.classList.remove("wrong-number");
                    errorMessageTel.classList.add("error-number");
                } else if (errors[i].id === "email") {
                    errorMessageEmail.classList.remove("wrong-email");
                    errorMessageEmail.classList.add("error-email");
                } else {
                    errors.length = 0;
                }
            }
        }
    });

    validator.registerCallback('check_phone', function(value) {
        let phoneCheck = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return phoneCheck.test(value);
    })
    .setMessage('check_phone', '');

    function clearErrors() {

        name.classList.remove("error");
        name.classList.add("review-user__input");

        surName.classList.remove("error");
        surName.classList.add("review-user__input");

        errorMessageTel.classList.remove("error-number");
        errorMessageTel.classList.add("wrong-number");

        errorMessageEmail.classList.remove("error-email");
        errorMessageEmail.classList.add("wrong-email");
    };

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
    };

}