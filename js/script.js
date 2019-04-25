window.onload = () => {
  const mobileMenuIcon = document.querySelector('.mobile-menu');
  const mobileMenu = document.querySelector('.mobile-navigation');
  const closeMobMenu = document.querySelector('.close-mobile-nav');
  const name = document.getElementById('name');
  const surName = document.getElementById('surname');
  const tel = document.querySelector('#tel');
  const errorMessageEmail = document.querySelector('.wrong-email-hidden');
  const errorMessageTel = document.querySelector('.wrong-number-hidden');
  const VMasker = require('vanilla-masker');
  const validate = require('validate-js');
  const popUpContainer = document.querySelector('.pop-up-container');
  const closePopUp = document.querySelector('.pop-up__close');
  const formInputs = document.getElementsByTagName('input');
  const pushButton = document.querySelector('.push');

  mobileMenuIcon.onclick = (e) => {
    e.preventDefault();
    mobileMenu.classList.add('show-nav');
    setTimeout(() => {
      mobileMenu.classList.add('visible-nav');
    }, 10);
  };


  closeMobMenu.onclick = (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('visible-nav');
    setTimeout(() => {
      mobileMenu.classList.remove('show-nav');
    }, 1000);
  };

  const showPopUpWindow = () => {
    popUpContainer.classList.remove('pop-up-none');
    popUpContainer.classList.add('pop-up-show');
    const { scrollX } = window;
    const { scrollY } = window;
    window.onscroll = () => { window.scrollTo(scrollX, scrollY); };
  };

  closePopUp.onclick = () => {
    popUpContainer.classList.remove('pop-up-show');
    popUpContainer.addEventListener('animationend', () => {
      popUpContainer.classList.add('pop-up-none');
    });
    window.onscroll = () => { window.scrollTo(); };
  };

  const clearInputs = () => {
    for (let i = 0; i < formInputs.length; i += 1) {
      formInputs[i].value = '';
    }
  };

  const clearErrors = () => {
    name.classList.remove('review-user__input-error');
    surName.classList.remove('review-user__input-error');
    errorMessageTel.classList.remove('wrong-number-or-email-visible');
    errorMessageEmail.classList.remove('wrong-number-or-email-visible');
  };

  const constraints = [{
    name: 'name',
    display: 'required',
    rules: 'required|min_length[2]|alpha',
  }, {
    name: 'surname',
    display: 'required',
    rules: 'required|min_length[2]|alpha',
  }, {
    name: 'telephone',
    display: 'Telephone No',
    rules: 'required|callback_check_phone',
  }, {
    name: 'email',
    display: 'Email No',
    rules: 'required|valid_email',
  }];

  const validator = new validate('form', constraints, ((errors, evt) => {
    clearErrors();
    if (errors.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].id === 'name') {
          name.classList.add('review-user__input-error');
        } else if (errors[i].id === 'surname') {
          surName.classList.add('review-user__input-error');
        } else if (errors[i].id === 'tel') {
          errorMessageTel.classList.add('wrong-number-or-email-visible');
        } else if (errors[i].id === 'email') {
          errorMessageEmail.classList.add('wrong-number-or-email-visible');
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
  }));

  for (const input of formInputs) {
    const currentInputName = input.name;
    const currentInputSurName = input.surname;
    const currentInputTel = input.telephone;
    const currentInputEmail = input.email;

    input.addEventListener('change', () => {
      const click = document.createEvent('MouseEvents');
      click.initMouseEvent('click', true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);

      constraints.forEach((item) => {
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

  validator.registerCallback('check_phone', (value) => {
    const phoneCheck = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return phoneCheck.test(value);
  })
    .setMessage('check_phone', '');

  // mask for phone
  const inputHandler = function (masks, max, event) {
    const input = event.target;
    const inputValue = input.value.replace(/\D/g, '');
    const maxLength = input.value.length > max ? 1 : 0;
    VMasker(input).unMask();
    VMasker(input).maskPattern(masks[maxLength]);
    input.value = VMasker.toPattern(inputValue, masks[maxLength]);
  };

  const telMask = ['+9(999)999-99-99', '+9(999)999-99-99'];
  VMasker(tel).maskPattern(telMask[0]);
  tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

  //
};
