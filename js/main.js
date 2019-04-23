"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      var name = document.getElementById('name');
      var surName = document.getElementById('surname');
      var tel = document.querySelector('#tel');
      var errorMessageEmail = document.querySelector('.wrong-email-hidden');
      var errorMessageTel = document.querySelector('.wrong-number-hidden');

      var VMasker = require("vanilla-masker");

      var validate = require("validate-js");

      var popUpContainer = document.querySelector('.pop-up-container');
      var closePopUp = document.querySelector('.pop-up__close');
      var formInputs = document.getElementsByTagName('input');
      var pushButton = document.querySelector('.push');

      mobileMenuIcon.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
        setTimeout(function () {
          mobileMenu.classList.add("visible-nav");
        }, 10);
      };

      closeMobMenu.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.remove("visible-nav");
        setTimeout(function () {
          mobileMenu.classList.remove("show-nav");
        }, 1000);
      };

      var showPopUpWindow = function showPopUpWindow() {
        popUpContainer.classList.remove('pop-up-none');
        popUpContainer.classList.add('pop-up-show');
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;

        window.onscroll = function () {
          window.scrollTo(scrollX, scrollY);
        };
      };

      closePopUp.onclick = function () {
        popUpContainer.classList.remove('pop-up-show');
        popUpContainer.addEventListener("animationend", function () {
          popUpContainer.classList.add('pop-up-none');
        });

        window.onscroll = function () {
          window.scrollTo();
        };
      };

      var clearInputs = function clearInputs() {
        for (var i = 0; i < formInputs.length; i++) {
          formInputs[i].value = "";
        }
      };

      var clearErrors = function clearErrors() {
        name.classList.remove("review-user__input-error");
        surName.classList.remove("review-user__input-error");
        errorMessageTel.classList.remove("wrong-number-or-email-visible");
        errorMessageEmail.classList.remove("wrong-number-or-email-visible");
      };

      var constraints = [{
        name: 'name',
        display: 'required',
        rules: 'required|min_length[2]|alpha'
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
      var validator = new validate('form', constraints, function (errors, evt) {
        clearErrors();

        if (errors.length > 0) {
          for (var i = 0; i < errors.length; i++) {
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
        } else if (evt) {
          evt.returnValue = false;
        }
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var input = _step.value;
          var currentInputName = input.name;
          var currentInputSurName = input.surname;
          var currentInputTel = input.telephone;
          var currentInputEmail = input.email;
          input.addEventListener('change', function () {
            var click = document.createEvent("MouseEvents");
            click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            constraints.forEach(function (item) {
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
        };

        for (var _iterator = formInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      validator.registerCallback('check_phone', function (value) {
        var phoneCheck = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        return phoneCheck.test(value);
      }).setMessage('check_phone', ''); //mask for phone

      var inputHandler = function inputHandler(masks, max, event) {
        var input = event.target;
        var inputValue = input.value.replace(/\D/g, '');
        var maxLength = input.value.length > max ? 1 : 0;
        VMasker(input).unMask();
        VMasker(input).maskPattern(masks[maxLength]);
        input.value = VMasker.toPattern(inputValue, masks[maxLength]);
      };

      var telMask = ['+9(999)999-99-99', '+9(999)999-99-99'];
      VMasker(tel).maskPattern(telMask[0]);
      tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false); //
    };
  }, {
    "validate-js": 2,
    "vanilla-masker": 3
  }],
  2: [function (require, module, exports) {
    /*
     * validate.js 2.0.1
     * Copyright (c) 2011 - 2015 Rick Harrison, http://rickharrison.me
     * validate.js is open sourced under the MIT license.
     * Portions of validate.js are inspired by CodeIgniter.
     * http://rickharrison.github.com/validate.js
     */
    (function (window, document, undefined) {
      /*
       * If you would like an application-wide config, change these defaults.
       * Otherwise, use the setMessage() function to configure form specific messages.
       */
      var defaults = {
        messages: {
          required: 'The %s field is required.',
          matches: 'The %s field does not match the %s field.',
          "default": 'The %s field is still set to default, please change.',
          valid_email: 'The %s field must contain a valid email address.',
          valid_emails: 'The %s field must contain all valid email addresses.',
          min_length: 'The %s field must be at least %s characters in length.',
          max_length: 'The %s field must not exceed %s characters in length.',
          exact_length: 'The %s field must be exactly %s characters in length.',
          greater_than: 'The %s field must contain a number greater than %s.',
          less_than: 'The %s field must contain a number less than %s.',
          alpha: 'The %s field must only contain alphabetical characters.',
          alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
          alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
          numeric: 'The %s field must contain only numbers.',
          integer: 'The %s field must contain an integer.',
          decimal: 'The %s field must contain a decimal number.',
          is_natural: 'The %s field must contain only positive numbers.',
          is_natural_no_zero: 'The %s field must contain a number greater than zero.',
          valid_ip: 'The %s field must contain a valid IP.',
          valid_base64: 'The %s field must contain a base64 string.',
          valid_credit_card: 'The %s field must contain a valid credit card number.',
          is_file_type: 'The %s field must contain only %s files.',
          valid_url: 'The %s field must contain a valid URL.',
          greater_than_date: 'The %s field must contain a more recent date than %s.',
          less_than_date: 'The %s field must contain an older date than %s.',
          greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
          less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
        },
        callback: function callback(errors) {}
      };
      /*
       * Define the regular expressions that will be used
       */

      var ruleRegex = /^(.+?)\[(.+)\]$/,
          numericRegex = /^[0-9]+$/,
          integerRegex = /^\-?[0-9]+$/,
          decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
          emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          alphaRegex = /^[a-z]+$/i,
          alphaNumericRegex = /^[a-z0-9]+$/i,
          alphaDashRegex = /^[a-z0-9_\-]+$/i,
          naturalRegex = /^[0-9]+$/i,
          naturalNoZeroRegex = /^[1-9][0-9]*$/i,
          ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
          base64Regex = /[^a-zA-Z0-9\/\+=]/i,
          numericDashRegex = /^[\d\-\s]+$/,
          urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
          dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
      /*
       * The exposed public object to validate a form:
       *
       * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
       * @param fields - Array - [{
       *     name: The name of the element (i.e. <input name="myField" />)
       *     display: 'Field Name'
       *     rules: required|matches[password_confirm]
       * }]
       * @param callback - Function - The callback after validation has been performed.
       *     @argument errors - An array of validation errors
       *     @argument event - The javascript event
       */

      var FormValidator = function FormValidator(formNameOrNode, fields, callback) {
        this.callback = callback || defaults.callback;
        this.errors = [];
        this.fields = {};
        this.form = this._formByNameOrNode(formNameOrNode) || {};
        this.messages = {};
        this.handlers = {};
        this.conditionals = {};

        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
          var field = fields[i]; // If passed in incorrectly, we need to skip the field.

          if (!field.name && !field.names || !field.rules) {
            console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
            console.warn(field);
            console.warn('Check to ensure you have properly configured a name and rules for this field');
            continue;
          }
          /*
           * Build the master fields array that has all the information needed to validate
           */


          if (field.names) {
            for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
              this._addField(field, field.names[j]);
            }
          } else {
            this._addField(field, field.name);
          }
        }
        /*
         * Attach an event callback for the form submission
         */


        var _onsubmit = this.form.onsubmit;

        this.form.onsubmit = function (that) {
          return function (evt) {
            try {
              return that._validateForm(evt) && (_onsubmit === undefined || _onsubmit());
            } catch (e) {}
          };
        }(this);
      },
          attributeValue = function attributeValue(element, attributeName) {
        var i;

        if (element.length > 0 && (element[0].type === 'radio' || element[0].type === 'checkbox')) {
          for (i = 0, elementLength = element.length; i < elementLength; i++) {
            if (element[i].checked) {
              return element[i][attributeName];
            }
          }

          return;
        }

        return element[attributeName];
      };
      /*
       * @public
       * Sets a custom message for one of the rules
       */


      FormValidator.prototype.setMessage = function (rule, message) {
        this.messages[rule] = message; // return this for chaining

        return this;
      };
      /*
       * @public
       *
       * @param fields - Array - [{
       *     name: The name of the element (i.e. <input name="myField" />)
       *     display: 'Field Name'
       *     rules: required|matches[password_confirm]
       * }]
       * Sets new custom validation rules set
       */


      FormValidator.prototype.setRules = function (fields) {
        this.fields = {};

        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
          var field = fields[i]; // If passed in incorrectly, we need to skip the field.

          if (!field.name && !field.names || !field.rules) {
            console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
            console.warn(field);
            console.warn('Check to ensure you have properly configured a name and rules for this field');
            continue;
          }
          /*
           * Build the master fields array that has all the information needed to validate
           */


          if (field.names) {
            for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
              this._addField(field, field.names[j]);
            }
          } else {
            this._addField(field, field.name);
          }
        } // return this for chaining


        return this;
      };
      /*
       * @public
       * Registers a callback for a custom rule (i.e. callback_username_check)
       */


      FormValidator.prototype.registerCallback = function (name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
          this.handlers[name] = handler;
        } // return this for chaining


        return this;
      };
      /*
       * @public
       * Registers a conditional for a custom 'depends' rule
       */


      FormValidator.prototype.registerConditional = function (name, conditional) {
        if (name && typeof name === 'string' && conditional && typeof conditional === 'function') {
          this.conditionals[name] = conditional;
        } // return this for chaining


        return this;
      };
      /*
       * @private
       * Determines if a form dom node was passed in or just a string representing the form name
       */


      FormValidator.prototype._formByNameOrNode = function (formNameOrNode) {
        return _typeof(formNameOrNode) === 'object' ? formNameOrNode : document.forms[formNameOrNode];
      };
      /*
       * @private
       * Adds a file to the master fields array
       */


      FormValidator.prototype._addField = function (field, nameValue) {
        this.fields[nameValue] = {
          name: nameValue,
          display: field.display || nameValue,
          rules: field.rules,
          depends: field.depends,
          id: null,
          element: null,
          type: null,
          value: null,
          checked: null
        };
      };
      /*
       * @private
       * Runs the validation when the form is submitted.
       */


      FormValidator.prototype._validateForm = function (evt) {
        this.errors = [];

        for (var key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            var field = this.fields[key] || {},
                element = this.form[field.name];

            if (element && element !== undefined) {
              field.id = attributeValue(element, 'id');
              field.element = element;
              field.type = element.length > 0 ? element[0].type : element.type;
              field.value = attributeValue(element, 'value');
              field.checked = attributeValue(element, 'checked');
              /*
               * Run through the rules for each field.
               * If the field has a depends conditional, only validate the field
               * if it passes the custom function
               */

              if (field.depends && typeof field.depends === "function") {
                if (field.depends.call(this, field)) {
                  this._validateField(field);
                }
              } else if (field.depends && typeof field.depends === "string" && this.conditionals[field.depends]) {
                if (this.conditionals[field.depends].call(this, field)) {
                  this._validateField(field);
                }
              } else {
                this._validateField(field);
              }
            }
          }
        }

        if (typeof this.callback === 'function') {
          this.callback(this.errors, evt);
        }

        if (this.errors.length > 0) {
          if (evt && evt.preventDefault) {
            evt.preventDefault();
          } else if (event) {
            // IE uses the global event variable
            event.returnValue = false;
          }
        }

        return true;
      };
      /*
       * @private
       * Looks at the fields value and evaluates it against the given rules
       */


      FormValidator.prototype._validateField = function (field) {
        var i,
            j,
            ruleLength,
            rules = field.rules.split('|'),
            indexOfRequired = field.rules.indexOf('required'),
            isEmpty = !field.value || field.value === '' || field.value === undefined;
        /*
         * Run through the rules and execute the validation methods as needed
         */

        for (i = 0, ruleLength = rules.length; i < ruleLength; i++) {
          var method = rules[i],
              param = null,
              failed = false,
              parts = ruleRegex.exec(method);
          /*
           * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
           * This ensures that a callback will always be called but other rules will be skipped.
           */

          if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
            continue;
          }
          /*
           * If the rule has a parameter (i.e. matches[param]) split it out
           */


          if (parts) {
            method = parts[1];
            param = parts[2];
          }

          if (method.charAt(0) === '!') {
            method = method.substring(1, method.length);
          }
          /*
           * If the hook is defined, run it to find any validation errors
           */


          if (typeof this._hooks[method] === 'function') {
            if (!this._hooks[method].apply(this, [field, param])) {
              failed = true;
            }
          } else if (method.substring(0, 9) === 'callback_') {
            // Custom method. Execute the handler if it was registered
            method = method.substring(9, method.length);

            if (typeof this.handlers[method] === 'function') {
              if (this.handlers[method].apply(this, [field.value, param, field]) === false) {
                failed = true;
              }
            }
          }
          /*
           * If the hook failed, add a message to the errors array
           */


          if (failed) {
            // Make sure we have a message for this rule
            var source = this.messages[field.name + '.' + method] || this.messages[method] || defaults.messages[method],
                message = 'An error has occurred with the ' + field.display + ' field.';

            if (source) {
              message = source.replace('%s', field.display);

              if (param) {
                message = message.replace('%s', this.fields[param] ? this.fields[param].display : param);
              }
            }

            var existingError;

            for (j = 0; j < this.errors.length; j += 1) {
              if (field.id === this.errors[j].id) {
                existingError = this.errors[j];
              }
            }

            var errorObject = existingError || {
              id: field.id,
              display: field.display,
              element: field.element,
              name: field.name,
              message: message,
              messages: [],
              rule: method
            };
            errorObject.messages.push(message);
            if (!existingError) this.errors.push(errorObject);
          }
        }
      };
      /**
       * private function _getValidDate: helper function to convert a string date to a Date object
       * @param date (String) must be in format yyyy-mm-dd or use keyword: today
       * @returns {Date} returns false if invalid
       */


      FormValidator.prototype._getValidDate = function (date) {
        if (!date.match('today') && !date.match(dateRegex)) {
          return false;
        }

        var validDate = new Date(),
            validDateArray;

        if (!date.match('today')) {
          validDateArray = date.split('-');
          validDate.setFullYear(validDateArray[0]);
          validDate.setMonth(validDateArray[1] - 1);
          validDate.setDate(validDateArray[2]);
        }

        return validDate;
      };
      /*
       * @private
       * Object containing all of the validation hooks
       */


      FormValidator.prototype._hooks = {
        required: function required(field) {
          var value = field.value;

          if (field.type === 'checkbox' || field.type === 'radio') {
            return field.checked === true;
          }

          return value !== null && value !== '';
        },
        "default": function _default(field, defaultName) {
          return field.value !== defaultName;
        },
        matches: function matches(field, matchName) {
          var el = this.form[matchName];

          if (el) {
            return field.value === el.value;
          }

          return false;
        },
        valid_email: function valid_email(field) {
          return emailRegex.test(field.value);
        },
        valid_emails: function valid_emails(field) {
          var result = field.value.split(/\s*,\s*/g);

          for (var i = 0, resultLength = result.length; i < resultLength; i++) {
            if (!emailRegex.test(result[i])) {
              return false;
            }
          }

          return true;
        },
        min_length: function min_length(field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length >= parseInt(length, 10);
        },
        max_length: function max_length(field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length <= parseInt(length, 10);
        },
        exact_length: function exact_length(field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length === parseInt(length, 10);
        },
        greater_than: function greater_than(field, param) {
          if (!decimalRegex.test(field.value)) {
            return false;
          }

          return parseFloat(field.value) > parseFloat(param);
        },
        less_than: function less_than(field, param) {
          if (!decimalRegex.test(field.value)) {
            return false;
          }

          return parseFloat(field.value) < parseFloat(param);
        },
        alpha: function alpha(field) {
          return alphaRegex.test(field.value);
        },
        alpha_numeric: function alpha_numeric(field) {
          return alphaNumericRegex.test(field.value);
        },
        alpha_dash: function alpha_dash(field) {
          return alphaDashRegex.test(field.value);
        },
        numeric: function numeric(field) {
          return numericRegex.test(field.value);
        },
        integer: function integer(field) {
          return integerRegex.test(field.value);
        },
        decimal: function decimal(field) {
          return decimalRegex.test(field.value);
        },
        is_natural: function is_natural(field) {
          return naturalRegex.test(field.value);
        },
        is_natural_no_zero: function is_natural_no_zero(field) {
          return naturalNoZeroRegex.test(field.value);
        },
        valid_ip: function valid_ip(field) {
          return ipRegex.test(field.value);
        },
        valid_base64: function valid_base64(field) {
          return base64Regex.test(field.value);
        },
        valid_url: function valid_url(field) {
          return urlRegex.test(field.value);
        },
        valid_credit_card: function valid_credit_card(field) {
          // Luhn Check Code from https://gist.github.com/4075533
          // accept only digits, dashes or spaces
          if (!numericDashRegex.test(field.value)) return false; // The Luhn Algorithm. It's so pretty.

          var nCheck = 0,
              nDigit = 0,
              bEven = false;
          var strippedField = field.value.replace(/\D/g, "");

          for (var n = strippedField.length - 1; n >= 0; n--) {
            var cDigit = strippedField.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
          }

          return nCheck % 10 === 0;
        },
        is_file_type: function is_file_type(field, type) {
          if (field.type !== 'file') {
            return true;
          }

          var ext = field.value.substr(field.value.lastIndexOf('.') + 1),
              typeArray = type.split(','),
              inArray = false,
              i = 0,
              len = typeArray.length;

          for (i; i < len; i++) {
            if (ext.toUpperCase() == typeArray[i].toUpperCase()) inArray = true;
          }

          return inArray;
        },
        greater_than_date: function greater_than_date(field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate > validDate;
        },
        less_than_date: function less_than_date(field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate < validDate;
        },
        greater_than_or_equal_date: function greater_than_or_equal_date(field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate >= validDate;
        },
        less_than_or_equal_date: function less_than_or_equal_date(field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate <= validDate;
        }
      };
      window.FormValidator = FormValidator;
    })(window, document);
    /*
     * Export as a CommonJS module
     */


    if (typeof module !== 'undefined' && module.exports) {
      module.exports = FormValidator;
    }
  }, {}],
  3: [function (require, module, exports) {
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else if (_typeof(exports) === 'object') {
        module.exports = factory();
      } else {
        root.VMasker = factory();
      }
    })(this, function () {
      var DIGIT = "9",
          ALPHA = "A",
          ALPHANUM = "S",
          BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
          isAllowedKeyCode = function isAllowedKeyCode(keyCode) {
        for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == BY_PASS_KEYS[i]) {
            return false;
          }
        }

        return true;
      },
          mergeMoneyOptions = function mergeMoneyOptions(opts) {
        opts = opts || {};
        opts = {
          delimiter: opts.delimiter || ".",
          lastOutput: opts.lastOutput,
          precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
          separator: opts.separator || ",",
          showSignal: opts.showSignal,
          suffixUnit: opts.suffixUnit && " " + opts.suffixUnit.replace(/[\s]/g, '') || "",
          unit: opts.unit && opts.unit.replace(/[\s]/g, '') + " " || "",
          zeroCents: opts.zeroCents
        };
        opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
        return opts;
      },
          // Fill wildcards past index in output with placeholder
      addPlaceholdersToOutput = function addPlaceholdersToOutput(output, index, placeholder) {
        for (; index < output.length; index++) {
          if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
            output[index] = placeholder;
          }
        }

        return output;
      };

      var VanillaMasker = function VanillaMasker(elements) {
        this.elements = elements;
      };

      VanillaMasker.prototype.unbindElementToMask = function () {
        for (var i = 0, len = this.elements.length; i < len; i++) {
          this.elements[i].lastOutput = "";
          this.elements[i].onkeyup = false;
          this.elements[i].onkeydown = false;

          if (this.elements[i].value.length) {
            this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
          }
        }
      };

      VanillaMasker.prototype.bindElementToMask = function (maskFunction) {
        var that = this,
            onType = function onType(e) {
          e = e || window.event;
          var source = e.target || e.srcElement;

          if (isAllowedKeyCode(e.keyCode)) {
            setTimeout(function () {
              that.opts.lastOutput = source.lastOutput;
              source.value = VMasker[maskFunction](source.value, that.opts);
              source.lastOutput = source.value;

              if (source.setSelectionRange && that.opts.suffixUnit) {
                source.setSelectionRange(source.value.length, source.value.length - that.opts.suffixUnit.length);
              }
            }, 0);
          }
        };

        for (var i = 0, len = this.elements.length; i < len; i++) {
          this.elements[i].lastOutput = "";
          this.elements[i].onkeyup = onType;

          if (this.elements[i].value.length) {
            this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
          }
        }
      };

      VanillaMasker.prototype.maskMoney = function (opts) {
        this.opts = mergeMoneyOptions(opts);
        this.bindElementToMask("toMoney");
      };

      VanillaMasker.prototype.maskNumber = function () {
        this.opts = {};
        this.bindElementToMask("toNumber");
      };

      VanillaMasker.prototype.maskAlphaNum = function () {
        this.opts = {};
        this.bindElementToMask("toAlphaNumeric");
      };

      VanillaMasker.prototype.maskPattern = function (pattern) {
        this.opts = {
          pattern: pattern
        };
        this.bindElementToMask("toPattern");
      };

      VanillaMasker.prototype.unMask = function () {
        this.unbindElementToMask();
      };

      var VMasker = function VMasker(el) {
        if (!el) {
          throw new Error("VanillaMasker: There is no element to bind.");
        }

        var elements = "length" in el ? el.length ? el : [] : [el];
        return new VanillaMasker(elements);
      };

      VMasker.toMoney = function (value, opts) {
        opts = mergeMoneyOptions(opts);

        if (opts.zeroCents) {
          opts.lastOutput = opts.lastOutput || "";
          var zeroMatcher = "(" + opts.separator + "[0]{0," + opts.precision + "})",
              zeroRegExp = new RegExp(zeroMatcher, "g"),
              digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
              lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0;
          value = value.toString().replace(zeroRegExp, "");

          if (digitsLength < lastDigitLength) {
            value = value.slice(0, value.length - 1);
          }
        }

        var number = value.toString().replace(/[\D]/g, ""),
            clearDelimiter = new RegExp("^(0|\\" + opts.delimiter + ")"),
            clearSeparator = new RegExp("(\\" + opts.separator + ")$"),
            money = number.substr(0, number.length - opts.moneyPrecision),
            masked = money.substr(0, money.length % 3),
            cents = new Array(opts.precision + 1).join("0");
        money = money.substr(money.length % 3, money.length);

        for (var i = 0, len = money.length; i < len; i++) {
          if (i % 3 === 0) {
            masked += opts.delimiter;
          }

          masked += money[i];
        }

        masked = masked.replace(clearDelimiter, "");
        masked = masked.length ? masked : "0";
        var signal = "";

        if (opts.showSignal === true) {
          signal = value < 0 || value.startsWith && value.startsWith('-') ? "-" : "";
        }

        if (!opts.zeroCents) {
          var beginCents = number.length - opts.precision,
              centsValue = number.substr(beginCents, opts.precision),
              centsLength = centsValue.length,
              centsSliced = opts.precision > centsLength ? opts.precision : centsLength;
          cents = (cents + centsValue).slice(-centsSliced);
        }

        var output = opts.unit + signal + masked + opts.separator + cents;
        return output.replace(clearSeparator, "") + opts.suffixUnit;
      };

      VMasker.toPattern = function (value, opts) {
        var pattern = _typeof(opts) === 'object' ? opts.pattern : opts,
            patternChars = pattern.replace(/\W/g, ''),
            output = pattern.split(""),
            values = value.toString().replace(/\W/g, ""),
            charsValues = values.replace(/\W/g, ''),
            index = 0,
            i,
            outputLength = output.length,
            placeholder = _typeof(opts) === 'object' ? opts.placeholder : undefined;

        for (i = 0; i < outputLength; i++) {
          // Reached the end of input
          if (index >= values.length) {
            if (patternChars.length == charsValues.length) {
              return output.join("");
            } else if (placeholder !== undefined && patternChars.length > charsValues.length) {
              return addPlaceholdersToOutput(output, i, placeholder).join("");
            } else {
              break;
            }
          } // Remaining chars in input
          else {
              if (output[i] === DIGIT && values[index].match(/[0-9]/) || output[i] === ALPHA && values[index].match(/[a-zA-Z]/) || output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/)) {
                output[i] = values[index++];
              } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
                if (placeholder !== undefined) {
                  return addPlaceholdersToOutput(output, i, placeholder).join("");
                } else {
                  return output.slice(0, i).join("");
                }
              }
            }
        }

        return output.join("").substr(0, i);
      };

      VMasker.toNumber = function (value) {
        return value.toString().replace(/(?!^-)[^0-9]/g, "");
      };

      VMasker.toAlphaNumeric = function (value) {
        return value.toString().replace(/[^a-z0-9 ]+/i, "");
      };

      return VMasker;
    });
  }, {}]
}, {}, [1]);