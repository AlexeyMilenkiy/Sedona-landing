window.onload = function() {

    let mobileMenuIcon = document.querySelector('.mobile-menu');
    let mobileMenu = document.querySelector('.mobile-navigation');
    let closeMobMenu = document.querySelector('.close-mobile-nav');
    let navigation = document.querySelector('.header__nav');
    const Name = document.getElementById('name');
    const surName = document.getElementById('surname');
    const tel = document.querySelector('#tel');
    const email = document.querySelector('#email');
    // const errorMessageEmail = document.querySelector('.wrong-email');
    // const errorMessageTel = document.querySelector('.wrong-number');
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


    // Это ограничения, используемые для проверки формы
    const constraints = {
        email: {
            // Email обязателен
            presence: true,
            // должен быть email(duh)
            email: true
        },

        name: {
            // имя обязательно
            presence: true,
            // должно быть не меньше 3 и не больше 20 символов
            length: {
                minimum: 3,
                maximum: 20
            }
        },
        surname: {
            // имя обязательно
            presence: true,
            // должно быть не меньше 3 и не больше 20 символов
            length: {
                minimum: 3,
                maximum: 20
            }
        }
    };
    const formData = {
        name: form.name,
        surname: form.surname,
        email: form.email
        // tel: form.tel
    };

    // подключение формы
    form.addEventListener('submit', event => {
        event.preventDefault();

        handleFormSubmit(form);
    });

    console.log(form.querySelectorAll("input[name]"));


    function handleFormSubmit(form) {
        // Сначала мы собираем значения из формы
        var values = validate.collectFormValues(form);
        // затем мы проверяем их на соответствие ограничениям
        var errors = validate(values, constraints);
        // Затем мы обновляем форму, чтобы отразить результаты
        showErrors(form, errors || {});
        // И если все ограничения пройдут, мы сообщим пользователю
        if (!errors) {
            showSuccess();
        }
    }

    // Обновляет инпуты с ошибками проверки
    function showErrors(form, errors) {
        // Мы перебираем все инпуты и показываем ошибки для этого инпута
        form.querySelectorAll("input[name]").forEach(function(input) {
            // поскольку ошибок может не быть то если ошибок не обнаружено,
            //  мы должны их обработать
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    // Показывает ошибки для конкретного инпута
    function showErrorsForInput(formData, errors) {
        // Это корень инпута
        var formGroup = closestParent(formData.parentNode);
        console.log(closestParent(formData.parentNode));
        // Найдите, куда сообщения об ошибках будут вставлены в
        // var messages = formGroup.querySelector(".messages");
        // Сначала мы удаляем все старые сообщения и сбрасываем классы
        resetFormGroup(formGroup);
        // Если у нас есть ошибки
        if (errors) {
            // мы сначала отмечаем, что в форме есть ошибки
            formGroup.classList.add("has-error");
            // затем мы добавляем все ошибки
            errors.forEach(function(error) {
                addError(messages, error);
            });
        } else {
            // в противном случае мы просто отмечаем это как успех
            formGroup.classList.add("has-success");
        }
    }

    // Рекурсивно найти ближайшего родителя, который имеет указанный класс
    function closestParent(child, className) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return closestParent(child.parentNode, className);
        }
    }

    function resetFormGroup(formGroup) {
        // Удалить классы успеха и ошибок
        formGroup.classList.remove("has-error");
        formGroup.classList.remove("has-success");
        // и удалите все старые сообщения
        formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
            el.parentNode.removeChild(el);
        });
    }

    // Добавляет указанную ошибку со следующей разметкой
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
        var block = document.createElement("p");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerHTML = error;
        messages.appendChild(block);
    }

    function showSuccess() {
        // We made it \:D/
        alert("Success!");
    }










    // validate(form.name.value, Constraints,{format: "flat"});
    //
    // let errorsname = validate(form.name.value, Constraints) || {};
    // console.log('errors', errorsname.name);
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