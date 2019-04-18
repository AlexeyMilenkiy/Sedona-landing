window.onload = function () {
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

    mobileMenuIcon.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
    };

    closeMobMenu.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
    };

    function showPopUpWindow(){
        popUpContainer.classList.add('pop-up-show');
        setTimeout(function () {
            popUpContainer.classList.add('pop-up-visible');
        }, 10);
    }

    function popUpClosed(){
        popUpContainer.classList.remove('pop-up-visible');
        setTimeout(function () {
            popUpContainer.classList.remove('pop-up-show');
        }, 2000);
    }

    function clearInputs(){
        for (let i=0; i< formInputs.length; i++){
            console.log(formInputs[i].value);
            formInputs[i].value = "";
        }
    }

    closePopUp.onclick = popUpClosed;

    const constraints = [{
        name: 'name',
        display: 'required',
        rules: 'required|min_length[2]',
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
    }];

    let validator = new validate('form', constraints, function (errors,event) {
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
        }else if (errors.length<=0){
            event.preventDefault();
            clearInputs();
            showPopUpWindow();
            let scrollX = window.scrollX;
            let scrollY = window.scrollY;
            window.onscroll = function () { window.scrollTo(scrollX, scrollY);};
        }
    });

    for (let input of formInputs) {
        const currentInputName = input.name;

        input.addEventListener('change', () => {
            let searchInput = false;
            constraints.forEach(item => {
                if (item.name === currentInputName) {
                    return searchInput = true
                }
            });
            if (searchInput) {
                const validationResult = new validate('form', constraints);
                 console.log('validationResult', validationResult);
            }
        });
    }

    validator.registerCallback('check_phone', function (value) {
        let phoneCheck = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        return phoneCheck.test(value);
    })
        .setMessage('check_phone', '');

    function clearErrors() {
        name.classList.remove("review-user__input-error");
        surName.classList.remove("review-user__input-error");
        errorMessageTel.classList.remove("wrong-number-or-email-visible");
        errorMessageEmail.classList.remove("wrong-number-or-email-visible");
    }

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