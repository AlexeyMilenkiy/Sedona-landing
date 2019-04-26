if (document.querySelector('.review__headline')) {
  const VMasker = require('vanilla-masker');
  const tel = document.querySelector('#tel');

  const inputHandler = (masks, max, event) => {
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
}
