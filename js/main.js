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

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    require('./validator.js');

    require('./mask.js');

    require('./mobile-menu.js');
  }, {
    "./mask.js": 2,
    "./mobile-menu.js": 3,
    "./validator.js": 4
  }],
  2: [function (require, module, exports) {
    if (document.querySelector('.review__headline')) {
      // eslint-disable-next-line global-require
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
  }, {
    "vanilla-masker": 12
  }],
  3: [function (require, module, exports) {
    if (document.querySelector('.review__headline')) {
      const mobileMenuIcon = document.querySelector('.mobile-menu');
      const mobileMenu = document.querySelector('.mobile-navigation');
      const closeMobMenu = document.querySelector('.close-mobile-nav');

      mobileMenuIcon.onclick = e => {
        e.preventDefault();
        mobileMenu.classList.add('show-nav');
        setTimeout(() => {
          mobileMenu.classList.add('visible-nav');
        }, 10);
      };

      closeMobMenu.onclick = e => {
        e.preventDefault();
        mobileMenu.classList.remove('visible-nav');
        setTimeout(() => {
          mobileMenu.classList.remove('show-nav');
        }, 1000);
      };
    }
  }, {}],
  4: [function (require, module, exports) {
    if (document.querySelector('.review__headline')) {
      const name = document.getElementById('name');
      const surName = document.getElementById('surname');
      const errorMessageEmail = document.querySelector('.wrong-email-hidden');
      const errorMessageTel = document.querySelector('.wrong-number-hidden');

      const validate = require('validate-js');

      const popUpContainer = document.querySelector('.pop-up-container');
      const closePopUp = document.querySelector('.pop-up__close');
      const formInputs = document.getElementsByTagName('input');
      const pushButton = document.querySelector('.push');

      const showPopUpWindow = () => {
        popUpContainer.classList.remove('pop-up-none');
        popUpContainer.classList.add('pop-up-show');
        const {
          scrollX
        } = window;
        const {
          scrollY
        } = window;

        window.onscroll = () => {
          window.scrollTo(scrollX, scrollY);
        };
      };

      closePopUp.onclick = () => {
        popUpContainer.classList.remove('pop-up-show');
        popUpContainer.addEventListener('animationend', () => {
          popUpContainer.classList.add('pop-up-none');
        });

        window.onscroll = () => {
          window.scrollTo();
        };
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
      const validator = new validate('form', constraints, (errors, evt) => {
        clearErrors();

        if (errors.length > 0) {
          for (let i = 0; i < errors.length; i += 1) {
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
      });

      for (const input of formInputs) {
        const currentInputName = input.name;
        const currentInputSurName = input.surname;
        const currentInputTel = input.telephone;
        const currentInputEmail = input.email;
        input.addEventListener('change', () => {
          const click = document.createEvent('MouseEvents');
          click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
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

      validator.registerCallback('check_phone', value => {
        const phoneCheck = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        return phoneCheck.test(value);
      }).setMessage('check_phone', '');
    }
  }, {
    "validate-js": 11
  }],
  5: [function (require, module, exports) {
    require('./main-page/main-page.js');

    require('./slider/slider.js');
  }, {
    "./main-page/main-page.js": 1,
    "./slider/slider.js": 10
  }],
  6: [function (require, module, exports) {
    if (document.querySelector('.slider-headline')) {
      const paginationImgBlock = document.querySelector('.pagination-img-block');
      let indexPagination = 3; //  number of buttons pagination

      let indexStartNumButton = 0; // eslint-disable-next-line global-require

      const modPagination = require('./pagination');

      const {
        addClassButton
      } = modPagination;
      console.log(addClassButton); // eslint-disable-next-line global-require

      const moduleImages = require('./show-images');

      const {
        links
      } = moduleImages;
      console.log(links); // search for the number of the last button pagination

      const searchLastNumberButton = n => {
        const buttonArr = document.querySelectorAll('.img-navigation');

        for (let i = 0; i < buttonArr.length; i += 1) {
          if (i + 1 === n) {
            indexStartNumButton = +buttonArr[i].innerText;
          }
        }
      }; // clear all button pagination


      const clearPagination = () => {
        while (paginationImgBlock.firstChild) {
          paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }
      };

      const showButtonLess = () => {
        const lessImg = document.createElement('button');
        lessImg.classList.add('lessImg-class');
        lessImg.id = 'lessImg';
        lessImg.textContent = '<<';
        paginationImgBlock.appendChild(lessImg);
      }; // creating a new button with a number greater than the previous one


      const createNewButtonMore = () => {
        const imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartNumButton + 1;
        paginationImgBlock.appendChild(imgNumber);
      }; // function showing new image after pressing a button "next"


      const showButtonMore = () => {
        const moreImg = document.createElement('button');
        moreImg.classList.add('moreImg-class');
        moreImg.id = 'moreImg';
        moreImg.textContent = '>>';
        paginationImgBlock.appendChild(moreImg);
      }; // creating a new button with a number less than the previous one


      const createNewButtonLess = () => {
        const imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartNumButton - 1;
        paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
      }; // show new pagination button after push button ">>"


      const showNextPagination = () => {
        searchLastNumberButton(indexPagination);
        clearPagination();
        showButtonLess();
        const reserveVariables = indexStartNumButton;
        indexPagination = indexStartNumButton + indexPagination;

        if (indexPagination === links.length) {
          for (indexStartNumButton; indexStartNumButton < indexPagination; indexStartNumButton += 1) {
            createNewButtonMore();
          }
        } else if (indexPagination < links.length) {
          for (indexStartNumButton; indexStartNumButton < indexPagination; indexStartNumButton += 1) {
            createNewButtonMore();
          }

          showButtonMore();
        } else {
          for (indexStartNumButton; indexStartNumButton < links.length; indexStartNumButton += 1) {
            createNewButtonMore();
          }
        }

        indexPagination -= reserveVariables;
        addClassButton();
      }; // show new pagination button after push button "<<"


      const showPrevPagination = () => {
        searchLastNumberButton(1);
        clearPagination();
        showButtonMore();
        const reserveVariables = indexStartNumButton;
        indexPagination = indexStartNumButton - indexPagination;

        if (indexPagination > 1) {
          for (indexStartNumButton; indexStartNumButton > indexPagination; indexStartNumButton -= 1) {
            createNewButtonLess();
          }

          const lessImg = document.createElement('button');
          lessImg.classList.add('lessImg-class');
          lessImg.id = 'lessImg';
          lessImg.textContent = '<<';
          paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]);
        } else {
          for (indexStartNumButton; indexStartNumButton > 1; indexStartNumButton -= 1) {
            createNewButtonLess();
          }
        }

        indexPagination = reserveVariables - indexPagination;
        addClassButton();
      };

      exports.showPrevPagination = showPrevPagination;
      exports.showNextPagination = showNextPagination;
    }
  }, {
    "./pagination": 8,
    "./show-images": 9
  }],
  7: [function (require, module, exports) {
    if (document.querySelector('.slider-headline')) {
      const next = document.querySelector('#next-slide');
      const sliderBlock = document.querySelector('.slider');
      const previous = document.querySelector('#prev-slide');
      let slides = document.querySelectorAll('.slide-single');
      let imgIndex = 0;
      let offset = 0;
      let isFlagAction = false; // eslint-disable-next-line global-require

      const moduleImages = require('./show-images');

      const {
        links
      } = moduleImages; // eslint-disable-next-line global-require

      const modulePagination = require('./pagination');

      const {
        addClassButton
      } = modulePagination;
      console.log(addClassButton); // find link active image after shift
      // eslint-disable-next-line consistent-return

      const findIndexLastImg = arg => {
        for (; imgIndex < links.length; imgIndex += 1) {
          if (links[imgIndex] === arg.src) {
            return imgIndex;
          }
        }
      }; // image shift function to the left


      const shiftImageLeft = () => {
        offset = 0;
        let step2 = 0;

        for (let i = 0; i < slides.length; i += 1) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2 += 1;
          }

          slides[i].style.left = `${offset * 100 - 100}%`;
        }
      }; // image shift function to the rights


      const shiftImageRight = () => {
        offset = 0;
        let step3 = slides.length;

        for (let i = slides.length - 1; i >= 0; i -= 1) {
          if (step3 - 1 > 0) {
            offset = 1;
            step3 -= 1;
          } else {
            offset = 0;
          }

          slides[i].style.left = `${offset * 100}%`;
        }
      };

      const addNextImage = () => {
        const rightImg = document.createElement('img');

        if (imgIndex >= links.length - 1) {
          imgIndex = 0;
        } else {
          imgIndex += 1;
        }

        rightImg.src = links[imgIndex];
        rightImg.classList.add('slide-single');
        rightImg.style.left = `${100}%`;
        sliderBlock.appendChild(rightImg);
        imgIndex = 0;
      }; // add new image on the left after shift


      const addPrevImage = () => {
        const leftImg = document.createElement('img');

        if (imgIndex <= 0) {
          imgIndex = links.length - 1;
        } else {
          imgIndex -= 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single');
        leftImg.style.left = `${-100}%`;
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
        imgIndex = 0;
      };

      next.onclick = () => {
        if (!isFlagAction) {
          slides = document.querySelectorAll('.slide-single');
          findIndexLastImg(slides[2]);
          slides[0].remove();
          shiftImageLeft();
          isFlagAction = true;
          setTimeout(() => {
            addNextImage();
            addClassButton();
            isFlagAction = false;
          }, 2000);
        }

        return false;
      }; // function showing new image after pressing a button "previous"


      previous.onclick = () => {
        if (!isFlagAction) {
          slides = document.querySelectorAll('.slide-single');
          findIndexLastImg(slides[0]);
          slides[2].remove();
          shiftImageRight();
          isFlagAction = true;
          setTimeout(() => {
            addPrevImage();
            addClassButton();
            isFlagAction = false;
          }, 2000);
        }

        return false;
      };
    }
  }, {
    "./pagination": 8,
    "./show-images": 9
  }],
  8: [function (require, module, exports) {
    if (document.querySelector('.slider-headline')) {
      const paginationImgBlock = document.querySelector('.pagination-img-block');
      const sliderBlock = document.querySelector('.slider');
      let slides = document.querySelectorAll('.slide-single');
      const indexPagination = 3; //  number of buttons pagination
      // let indexStartNumButton = 0;

      let numberPushButton = 0;
      let activeButton = 0;
      let imgIndex = 0;
      let offset = 0;
      let indexActiveImg = 0;
      let linkNewImage = 0;
      let isFlagAction = false; // eslint-disable-next-line global-require

      const moduleImages = require('./show-images');

      const {
        links
      } = moduleImages; // eslint-disable-next-line global-require

      const moduleShowMoreLess = require('./more-less-pagination');

      const {
        showPrevPagination
      } = moduleShowMoreLess;
      const {
        showNextPagination
      } = moduleShowMoreLess; // find link active image after shift
      // eslint-disable-next-line consistent-return

      const findIndexLastImg = arg => {
        for (; imgIndex < links.length; imgIndex += 1) {
          if (links[imgIndex] === arg.src) {
            return imgIndex;
          }
        }
      }; // add new image on the right after shift


      const addNextImage = () => {
        const rightImg = document.createElement('img');

        if (imgIndex >= links.length - 1) {
          imgIndex = 0;
        } else {
          imgIndex += 1;
        }

        rightImg.src = links[imgIndex];
        rightImg.classList.add('slide-single');
        rightImg.style.left = `${100}%`;
        sliderBlock.appendChild(rightImg);
        imgIndex = 0;
      }; // add new image on the left after shift


      const addPrevImage = () => {
        const leftImg = document.createElement('img');

        if (imgIndex <= 0) {
          imgIndex = links.length - 1;
        } else {
          imgIndex -= 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single');
        leftImg.style.left = `${-100}%`;
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
        imgIndex = 0;
      }; // image shift function to the left


      const shiftImageLeft = () => {
        offset = 0;
        let step2 = 0;

        for (let i = 0; i < slides.length; i += 1) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2 += 1;
          }

          slides[i].style.left = `${offset * 100 - 100}%`;
        }
      }; // image shift function to the rights


      const shiftImageRight = () => {
        offset = 0;
        let step3 = slides.length;

        for (let i = slides.length - 1; i >= 0; i -= 1) {
          if (step3 - 1 > 0) {
            offset = 1;
            step3 -= 1;
          } else {
            offset = 0;
          }

          slides[i].style.left = `${offset * 100}%`;
        }
      }; // active image index definition


      const searchActiveImg = () => {
        slides = document.querySelectorAll('.slide-single');

        for (let i = 0; i < links.length; i += 1) {
          if (links[i] === slides[1].src) {
            indexActiveImg = i;
          }
        }
      }; // adding "active" class to a button


      const addClassButton = () => {
        let indexActiveButton = 0;
        searchActiveImg();
        indexActiveImg += 1;
        const buttonArr = document.querySelectorAll('.img-navigation');
        const buttonMore = document.getElementById('moreImg');
        const buttonLess = document.getElementById('lessImg');

        for (; indexActiveButton < buttonArr.length; indexActiveButton += 1) {
          buttonArr[indexActiveButton].classList.remove('active');

          if (buttonMore) {
            buttonMore.classList.remove('active');
          }

          if (buttonLess) {
            buttonLess.classList.remove('active');
          }

          if (indexActiveImg > +buttonArr[buttonArr.length - 1].innerText) {
            buttonMore.classList.add('active');
          }

          if (indexActiveImg < +buttonArr[0].innerText) {
            buttonLess.classList.add('active');
          } else if (+buttonArr[indexActiveButton].innerText === indexActiveImg) {
            buttonArr[indexActiveButton].classList.add('active');
          }
        }

        indexActiveImg = 0;
      };

      exports.addClassButton = addClassButton; // function showing new image after pressing a button "next"

      const showButtonMore = () => {
        const moreImg = document.createElement('button');
        moreImg.classList.add('moreImg-class');
        moreImg.id = 'moreImg';
        moreImg.textContent = '>>';
        paginationImgBlock.appendChild(moreImg);
      }; // start function create pagination button


      const showPagination = () => {
        if (links.length > indexPagination) {
          for (let i = 0; i < indexPagination; i += 1) {
            const imgNumber = document.createElement('button');
            imgNumber.classList.add('img-navigation');
            imgNumber.textContent = i + 1;
            paginationImgBlock.appendChild(imgNumber);
          }

          showButtonMore();
        } else if (links.length <= indexPagination) {
          for (let i = 0; i < links.length; i += 1) {
            const imgNumber = document.createElement('button');
            imgNumber.classList.add('img-navigation');
            imgNumber.textContent = i + 1;
            paginationImgBlock.appendChild(imgNumber);
          }
        }

        addClassButton();
      }; // brute force pagination array


      const bruteForcePagination = () => {
        const buttonArr = document.querySelectorAll('.img-navigation');
        const lessButton = document.getElementById('lessImg');
        const moreButton = document.getElementById('moreImg');

        if (lessButton) {
          if (lessButton.classList.contains('active')) {
            activeButton = -1;
          }
        }

        if (moreButton) {
          if (moreButton.classList.contains('active')) {
            activeButton = links.length + 1;
          }
        }

        for (let i = 0; i < buttonArr.length; i += 1) {
          if (buttonArr[i].classList.contains('active')) {
            activeButton = +buttonArr[i].innerText;
          }
        }
      }; // search for a link to a picture of the corresponding pressed button


      const searchIndexNewImage = () => {
        for (let i = 0; i < links.length; i += 1) {
          if (i + 1 === numberPushButton) {
            linkNewImage = links[i];
            break;
          }
        }
      }; // adding a new image after pressing the button with the number more than the active one


      const addNextImageFromPagination = () => {
        if (isFlagAction) {
          return;
        }

        const rightImg = document.createElement('img');
        searchIndexNewImage();
        slides[0].remove();
        slides[2].remove();
        rightImg.src = linkNewImage;
        rightImg.classList.add('slide-single');
        rightImg.style.left = `${100}%`;
        sliderBlock.appendChild(rightImg);
        slides = document.querySelectorAll('.slide-single');
        isFlagAction = true;
        setTimeout(() => {
          shiftImageLeft();
        }, 200);
        setTimeout(() => {
          findIndexLastImg(slides[1]);
          addNextImage();
          slides[0].remove();
          findIndexLastImg(slides[1]);
          addPrevImage();
          addClassButton();
          numberPushButton = 0;
          linkNewImage = 0;
          isFlagAction = false;
        }, 2000);
      }; // adding a new image after pressing the button with the number less than the active one


      const addPrevImageFromPagination = () => {
        if (isFlagAction) {
          return;
        }

        const leftImg = document.createElement('img');
        searchIndexNewImage();
        slides[0].remove();
        slides[2].remove();
        leftImg.src = linkNewImage;
        leftImg.classList.add('slide-single');
        leftImg.style.left = `${-100}%`;
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
        slides = document.querySelectorAll('.slide-single');
        isFlagAction = true;
        setTimeout(() => {
          shiftImageRight();
        }, 200);
        setTimeout(() => {
          findIndexLastImg(slides[0]);
          addPrevImage();
          slides[1].remove();
          findIndexLastImg(slides[0]);
          addNextImage();
          addClassButton();
          numberPushButton = 0;
          linkNewImage = 0;
          isFlagAction = false;
        }, 2000);
      }; // showing a new image after pressing a button pagination


      const showNotActiveImg = () => {
        let indexWaitImage = 0;
        const buttonArr = document.querySelectorAll('.img-navigation');
        bruteForcePagination();

        for (; indexWaitImage <= links.length; indexWaitImage += 1) {
          if (indexWaitImage === numberPushButton) {
            for (let i = 0; i < buttonArr.length; i += 1) {
              if (+buttonArr[i].innerText === numberPushButton) {
                if (indexWaitImage > activeButton) {
                  addNextImageFromPagination();
                  break;
                } else {
                  addPrevImageFromPagination();
                  break;
                }
              }
            }
          }
        }
      }; // checking whether the active class has a button


      const containsActiveClass = x => {
        const numButton = +x;
        const buttonArr = document.querySelectorAll('.img-navigation');

        for (let i = 0; i < buttonArr.length; i += 1) {
          if (numButton === +buttonArr[i].innerText) {
            if (buttonArr[i].classList.contains('active')) {
              break;
            } else {
              showNotActiveImg();
              break;
            }
          }
        }
      };

      paginationImgBlock.onclick = event => {
        const {
          target
        } = event;

        if (target.id === 'moreImg') {
          showNextPagination();
        } else if (target.id === 'lessImg') {
          showPrevPagination();
        } else if (target.id !== 'lessImg' && 'moreImg') {
          numberPushButton = +target.innerText;
          containsActiveClass(target.innerText);
        }
      };

      showPagination();
    }
  }, {
    "./more-less-pagination": 6,
    "./show-images": 9
  }],
  9: [function (require, module, exports) {
    if (document.querySelector('.slider-headline')) {
      const slides = document.querySelectorAll('.slide-single');
      const sliderBlock = document.querySelector('.slider');
      const links = [];
      exports.links = links;
      const imgIndex = 0;
      const offset = 0;
      const offset1 = 1;
      const img = document.createElement('img');
      const img1 = document.createElement('img');
      const img2 = document.createElement('img'); // create array with links images on slider

      const findLinksImg = () => {
        for (let i = 0; i < slides.length; i += 1) {
          links[i] = slides[i].src;
          slides[i].remove();
        }
      }; // start function create images on pages


      const showImage = () => {
        findLinksImg();
        img.src = links[links.length - 1];
        img.classList.add('slide-single');
        img.style.left = `${offset1 - 100}%`;
        sliderBlock.appendChild(img);
        img1.src = links[imgIndex];
        img1.classList.add('slide-single');
        img1.style.left = `${offset * 100}%`;
        sliderBlock.appendChild(img1);
        img2.src = links[imgIndex + 1];
        img2.classList.add('slide-single');
        img2.style.left = `${offset1 * 100}%`;
        sliderBlock.appendChild(img2);
      };

      showImage();
    }
  }, {}],
  10: [function (require, module, exports) {
    require('./show-images.js');

    require('./next-prev.js');

    require('./more-less-pagination.js');

    require('./pagination.js');
  }, {
    "./more-less-pagination.js": 6,
    "./next-prev.js": 7,
    "./pagination.js": 8,
    "./show-images.js": 9
  }],
  11: [function (require, module, exports) {
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
        callback: function (errors) {}
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

      var FormValidator = function (formNameOrNode, fields, callback) {
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
          attributeValue = function (element, attributeName) {
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
        return typeof formNameOrNode === 'object' ? formNameOrNode : document.forms[formNameOrNode];
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
        required: function (field) {
          var value = field.value;

          if (field.type === 'checkbox' || field.type === 'radio') {
            return field.checked === true;
          }

          return value !== null && value !== '';
        },
        "default": function (field, defaultName) {
          return field.value !== defaultName;
        },
        matches: function (field, matchName) {
          var el = this.form[matchName];

          if (el) {
            return field.value === el.value;
          }

          return false;
        },
        valid_email: function (field) {
          return emailRegex.test(field.value);
        },
        valid_emails: function (field) {
          var result = field.value.split(/\s*,\s*/g);

          for (var i = 0, resultLength = result.length; i < resultLength; i++) {
            if (!emailRegex.test(result[i])) {
              return false;
            }
          }

          return true;
        },
        min_length: function (field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length >= parseInt(length, 10);
        },
        max_length: function (field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length <= parseInt(length, 10);
        },
        exact_length: function (field, length) {
          if (!numericRegex.test(length)) {
            return false;
          }

          return field.value.length === parseInt(length, 10);
        },
        greater_than: function (field, param) {
          if (!decimalRegex.test(field.value)) {
            return false;
          }

          return parseFloat(field.value) > parseFloat(param);
        },
        less_than: function (field, param) {
          if (!decimalRegex.test(field.value)) {
            return false;
          }

          return parseFloat(field.value) < parseFloat(param);
        },
        alpha: function (field) {
          return alphaRegex.test(field.value);
        },
        alpha_numeric: function (field) {
          return alphaNumericRegex.test(field.value);
        },
        alpha_dash: function (field) {
          return alphaDashRegex.test(field.value);
        },
        numeric: function (field) {
          return numericRegex.test(field.value);
        },
        integer: function (field) {
          return integerRegex.test(field.value);
        },
        decimal: function (field) {
          return decimalRegex.test(field.value);
        },
        is_natural: function (field) {
          return naturalRegex.test(field.value);
        },
        is_natural_no_zero: function (field) {
          return naturalNoZeroRegex.test(field.value);
        },
        valid_ip: function (field) {
          return ipRegex.test(field.value);
        },
        valid_base64: function (field) {
          return base64Regex.test(field.value);
        },
        valid_url: function (field) {
          return urlRegex.test(field.value);
        },
        valid_credit_card: function (field) {
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
        is_file_type: function (field, type) {
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
        greater_than_date: function (field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate > validDate;
        },
        less_than_date: function (field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate < validDate;
        },
        greater_than_or_equal_date: function (field, date) {
          var enteredDate = this._getValidDate(field.value),
              validDate = this._getValidDate(date);

          if (!validDate || !enteredDate) {
            return false;
          }

          return enteredDate >= validDate;
        },
        less_than_or_equal_date: function (field, date) {
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
  12: [function (require, module, exports) {
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else if (typeof exports === 'object') {
        module.exports = factory();
      } else {
        root.VMasker = factory();
      }
    })(this, function () {
      var DIGIT = "9",
          ALPHA = "A",
          ALPHANUM = "S",
          BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
          isAllowedKeyCode = function (keyCode) {
        for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == BY_PASS_KEYS[i]) {
            return false;
          }
        }

        return true;
      },
          mergeMoneyOptions = function (opts) {
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
      addPlaceholdersToOutput = function (output, index, placeholder) {
        for (; index < output.length; index++) {
          if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
            output[index] = placeholder;
          }
        }

        return output;
      };

      var VanillaMasker = function (elements) {
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
            onType = function (e) {
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

      var VMasker = function (el) {
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
        var pattern = typeof opts === 'object' ? opts.pattern : opts,
            patternChars = pattern.replace(/\W/g, ''),
            output = pattern.split(""),
            values = value.toString().replace(/\W/g, ""),
            charsValues = values.replace(/\W/g, ''),
            index = 0,
            i,
            outputLength = output.length,
            placeholder = typeof opts === 'object' ? opts.placeholder : undefined;

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
}, {}, [5]);