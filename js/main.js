"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    window.onload = function () {
      var mobileMenuIcon = document.querySelector('.mobile-menu');
      var mobileMenu = document.querySelector('.mobile-navigation');
      var closeMobMenu = document.querySelector('.close-mobile-nav');
      var navigation = document.querySelector('.header__nav');
      var Name = document.getElementById('name');
      var surName = document.getElementById('surname');
      var tel = document.querySelector('#tel');
      var email = document.querySelector('#email');
      var errorMessageEmail = document.querySelector('.wrong-email');
      var errorMessageTel = document.querySelector('.wrong-number'); // const validate = require("validate.js");

      var form = document.querySelector(".main-form");
      var inputs = form.querySelectorAll("input[type=text], input[type=email]");
      console.log(inputs);
      var i = 0;
      var validator = new FormValidator('form', [{
        name: 'name',
        display: 'required',
        rules: 'required'
      }, {
        name: 'surname',
        display: 'required',
        rules: 'required'
      }, {
        name: 'email',
        display: 'required',
        rules: 'valid_email'
      }, {
        name: 'telephone',
        display: 'min length',
        rules: 'min_length[8]'
      }], function (errors) {
        if (errors.length > 0) {
          // Show the errors
          console.log(errors);
          Name.classList.remove('review-user__input');
          Name.classList.add('has-error-review-user__input');
          console.log(errors[i].id);

          for (; i < errors.length; i++) {
            return errors[i].id;
          }
        }
      });

      mobileMenuIcon.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
      };

      closeMobMenu.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
      };

      var formData = {
        name: form.name,
        surname: form.surname,
        email: form.email // tel: form.tel

      }; // // подключение формы
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
    };
  }, {}]
}, {}, [1]);