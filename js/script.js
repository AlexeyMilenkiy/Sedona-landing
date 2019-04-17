window.onload = function() {
    let mobileMenuIcon = document.querySelector('.mobile-menu');
    let mobileMenu = document.querySelector('.mobile-navigation');
    let closeMobMenu = document.querySelector('.close-mobile-nav');
    let navigation = document.querySelector('.header__nav');
    const name = document.getElementById('name');
    const surName = document.getElementById('surname');
    const tel = document.querySelector('#tel');
    const email = document.querySelector('#email');
    const errorMessageEmail = document.querySelector('.wrong-email-hidden');
    const errorMessageTel = document.querySelector('.wrong-number-hidden');
    let validate = require("validate-js");
    const form = document.querySelector(".main-form");
    let VMasker = require("vanilla-masker");

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
    };

    let validator = new validate('form', [{
        name: 'name',
        display: 'required',
        rules: 'required|min_length[2]'
    }, {
        name: 'surname',
        display: 'required',
        rules: 'required|min_length[2]'
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
                    name.classList.add("review-user__input-error");
                } else if (errors[i].id === 'surname') {
                    surName.classList.add("review-user__input-error");
                } else if (errors[i].id === 'tel') {
                    errorMessageTel.classList.add("wrong-number-or-email-visible");
                } else if (errors[i].id === "email") {
                    errorMessageEmail.classList.add("wrong-number-or-email-visible");
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
        name.classList.remove("review-user__input-error");
        surName.classList.remove("review-user__input-error");
        errorMessageTel.classList.remove("wrong-number-or-email-visible");
        errorMessageEmail.classList.remove("wrong-number-or-email-visible");
    }

    function inputHandler(masks, max, event) {
        let input = event.target;
        let inputValue = input.value.replace(/\D/g, '');
        let maxLength = input.value.length > max ? 1 : 0;
        VMasker(input).unMask();
        VMasker(input).maskPattern(masks[maxLength]);
        input.value = VMasker.toPattern(inputValue, masks[maxLength]);
    }

    let telMask = ['+9(999) 999-99-99', '+9(999) 999-99-99'];
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);


};