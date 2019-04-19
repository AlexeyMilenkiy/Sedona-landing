window.onload = function() {
    let mobileMenuIcon = document.querySelector('.mobile-menu');
    let mobileMenu = document.querySelector('.mobile-navigation');
    let closeMobMenu = document.querySelector('.close-mobile-nav');
    const name = document.getElementById('name');
    const surName = document.getElementById('surname');
    const tel = document.querySelector('#tel');
    const errorMessageEmail = document.querySelector('.wrong-email-hidden');
    const errorMessageTel = document.querySelector('.wrong-number-hidden');
    let VMasker = require("vanilla-masker");
    let validate = require("validate-js");
    const popUpContainer = document.querySelector('.pop-up-container');
    const closePopUp = document.querySelector('.pop-up__close');
    const formInputs = document.getElementsByTagName('input');
    const pushButton = document.querySelector('.push');

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
        setTimeout(function(){
            mobileMenu.classList.add("visible-nav");
        },10);
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("visible-nav");
        setTimeout(function (){
            mobileMenu.classList.remove("show-nav");
        },1000)
    };

    function showPopUpWindow() {
        popUpContainer.classList.add('pop-up-show');
        setTimeout(function() {
            let scrollX = window.scrollX;
            let scrollY = window.scrollY;
            window.onscroll = function () { window.scrollTo(scrollX, scrollY);};
            popUpContainer.classList.add('pop-up-visible');
        }, 10);
    }

    function popUpClosed() {
        popUpContainer.classList.remove('pop-up-visible');
        setTimeout(function() {
            popUpContainer.classList.remove('pop-up-show');
            window.onscroll = function() { window.scrollTo(); };
        }, 2000);
    }

    function clearInputs() {
            for (let i = 0; i < formInputs.length; i++) {
                formInputs[i].value = "";
            }
    }

    closePopUp.onclick = popUpClosed;

    function clearErrors() {
        name.classList.remove("review-user__input-error");
        surName.classList.remove("review-user__input-error");
        errorMessageTel.classList.remove("wrong-number-or-email-visible");
        errorMessageEmail.classList.remove("wrong-number-or-email-visible");
    }

    const constraints = [{
        name: 'name',
        display: 'required',
        rules: 'required|min_length[2]|alpha',
    }, {
        name: 'surname',
        display: 'required',
        rules: 'required|min_length[2]|alpha'
    }, {
        name: 'telephone',
        display: 'Telephone No',
        rules: 'required|callback_check_phone'
    }, {
        name: 'email',
        display: 'Email No',
        rules: 'required|valid_email'
    }];

    let validator = new validate('form', constraints, function(errors, evt) {
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
        } else {
            clearInputs();
            popUpContainer.classList.add('pop-up-show');
            showPopUpWindow();
        }
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        } else if (event) {
            event.returnValue = false;
        }
    });

    for (let input of formInputs) {
        const currentInputName = input.name;
        const currentInputSurName = input.surname;
        const currentInputTel = input.telephone;
        const currentInputEmail = input.email;

        input.addEventListener('change', () => {
            const click = document.createEvent("MouseEvents");
            click.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);

            constraints.forEach(item => {
                if (item.name === currentInputName) {
                    pushButton.dispatchEvent(click);
                } else if (item.name === currentInputSurName) {
                    pushButton.dispatchEvent(click);
                } else if (item.name === currentInputTel) {
                    pushButton.dispatchEvent(click);
                } else if (item.name === currentInputEmail) {
                    pushButton.dispatchEvent(click);
                }
            });
        });
    }

    validator.registerCallback('check_phone', function(value) {
            let phoneCheck = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
            return phoneCheck.test(value);
        })
        .setMessage('check_phone', '');

    //mask for phone
    function inputHandler(masks, max, event) {
        let input = event.target;
        let inputValue = input.value.replace(/\D/g, '');
        let maxLength = input.value.length > max ? 1 : 0;
        VMasker(input).unMask();
        VMasker(input).maskPattern(masks[maxLength]);
        input.value = VMasker.toPattern(inputValue, masks[maxLength]);
    }

    let telMask = ['+9(999)999-99-99', '+9(999)999-99-99'];
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

    //
};