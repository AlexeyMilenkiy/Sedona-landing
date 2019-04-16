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
      require('./slider.js');

      var mobileMenuIcon = document.querySelector('.mobile-menu');
      var mobileMenu = document.querySelector('.mobile-navigation');
      var closeMobMenu = document.querySelector('.close-mobile-nav');
      var navigation = document.querySelector('.header__nav');

      mobileMenuIcon.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.add("show-nav");
      };

      closeMobMenu.onclick = function (e) {
        e.preventDefault();
        mobileMenu.classList.remove("show-nav");
      };
    };
  }, {
    "./slider.js": 2
  }],
  2: [function (require, module, exports) {
    window.onload = function () {
      var slides = document.querySelectorAll('.slide-single');
      var next = document.querySelector('#next-slide');
      var previous = document.querySelector('#prev-slide');
      var sliderBlock = document.querySelector('.slider');
      var paginationImgBlock = document.querySelector('.pagination-img-block');
      var links = [];
      var imgIndex = 0;
      var offset = 0;
      var indexPagination = 3;
      var indexStartImg = 0;
      var indexActiveImg = 0;
      showImage();
      showPagination();

      function findLinksImg() {
        for (var i = 0; i < slides.length; i++) {
          links[i] = slides[i].src;
          slides[i].remove();
        }
      }

      function showImage() {
        findLinksImg();
        imgIndex = 0;
        var offset1 = 1;
        var img = document.createElement('img');
        var img1 = document.createElement('img');
        var img2 = document.createElement('img');
        img.src = links[links.length - 1];
        img.classList.add('slide-single');
        img.style.left = offset1 - 100 + '%';
        sliderBlock.appendChild(img);
        img1.src = links[imgIndex];
        img1.classList.add('slide-single');
        img1.style.left = offset * 100 + '%';
        sliderBlock.appendChild(img1);
        img2.src = links[imgIndex + 1];
        img2.classList.add('slide-single');
        img2.style.left = offset1 * 100 + '%';
        sliderBlock.appendChild(img2);
      }

      function showPagination() {
        if (links.length > indexPagination) {
          for (var i = 0; i < indexPagination; i++) {
            var imgNumber = document.createElement('button');
            imgNumber.classList.add('img-navigation');
            imgNumber.textContent = i + 1;
            paginationImgBlock.appendChild(imgNumber);
          }

          showButtonMore();
        } else if (links.length <= indexPagination) {
          for (var _i = 0; _i < links.length; _i++) {
            var _imgNumber = document.createElement('button');

            _imgNumber.classList.add('img-navigation');

            _imgNumber.textContent = _i + 1;
            paginationImgBlock.appendChild(_imgNumber);
          }
        }

        addClassButton();
      }

      function findIndexLastImg(arg) {
        // imgIndex = 0;
        for (; imgIndex < links.length; imgIndex++) {
          if (links[imgIndex] === arg.src) {
            return imgIndex;
          }
        }
      }

      function addNextImage() {
        var rightImg = document.createElement('img');

        if (imgIndex >= links.length - 1) {
          imgIndex = 0;
        } else {
          imgIndex = imgIndex + 1;
        }

        rightImg.src = links[imgIndex];
        rightImg.classList.add('slide-single');
        rightImg.style.left = 100 + '%';
        sliderBlock.appendChild(rightImg);
        imgIndex = 0;
      }

      function addPrevImage() {
        var leftImg = document.createElement('img');

        if (imgIndex <= 0) {
          imgIndex = links.length - 1;
        } else {
          imgIndex = imgIndex - 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single');
        leftImg.style.left = -100 + '%';
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
        imgIndex = 0;
      }

      function showNextImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step2 = 0;
        findIndexLastImg(slides[2]);
        slides[0].remove();

        for (var i = 0; i < slides.length; i++) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2++;
          }

          slides[i].style.left = offset * 100 - 100 + '%';
        }

        setTimeout(function () {
          addNextImage();
          addClassButton();
        }, 2000);
      }

      function showPrevImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step3 = slides.length;
        findIndexLastImg(slides[0]);
        slides[2].remove();

        for (var i = slides.length - 1; i >= 0; i--) {
          if (step3 - 1 > 0) {
            offset = 1;
            step3--;
          } else {
            offset = 0;
          }

          slides[i].style.left = offset * 100 + '%';
        }

        setTimeout(function () {
          addPrevImage();
          addClassButton();
        }, 2000);
      }

      next.onclick = showNextImage;
      previous.onclick = showPrevImage;

      function showButtonMore() {
        var moreImg = document.createElement('button');
        moreImg.classList.add('moreImg-class');
        moreImg.id = "moreImg";
        moreImg.textContent = ">>";
        paginationImgBlock.appendChild(moreImg);
      }

      function showButtonLess() {
        var lessImg = document.createElement('button');
        lessImg.classList.add('lessImg-class');
        lessImg.id = "lessImg";
        lessImg.textContent = "<<";
        paginationImgBlock.appendChild(lessImg);
      }

      function createNewButtonMore() {
        var imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartImg + 1;
        paginationImgBlock.appendChild(imgNumber);
      }

      function createNewButtonLess() {
        var imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartImg - 1;
        paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
      } //отрисовка новой пагинации после нажатия >>


      function showMoreAmountImage() {
        findNumberImage(2);
        clearPagination();
        showButtonLess();
        var reserveVariables = +indexStartImg;
        indexPagination = +indexStartImg + indexPagination;

        if (indexPagination <= links.length) {
          for (+indexStartImg; +indexStartImg < indexPagination; +indexStartImg++) {
            createNewButtonMore();
          }

          showButtonMore();
        } else {
          for (+indexStartImg; +indexStartImg < links.length; +indexStartImg++) {
            createNewButtonMore();
          }
        }

        indexPagination = indexPagination - reserveVariables;
        addClassButton();
      } //отрисовка новой пагинации после нажатия <<


      function showLessAmountImage() {
        findNumberImage(0);
        clearPagination();
        showButtonMore();
        var reserveVariables = +indexStartImg;
        indexPagination = +indexStartImg - indexPagination;

        if (indexPagination > 1) {
          for (+indexStartImg; +indexStartImg > indexPagination; +indexStartImg--) {
            createNewButtonLess();
          } // вынести в отдельную функцию
          //


          var lessImg = document.createElement('button');
          lessImg.classList.add('lessImg-class');
          lessImg.id = "lessImg";
          lessImg.textContent = "<<";
          paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]); //
          //
        } else {
          for (+indexStartImg; +indexStartImg > 1; +indexStartImg--) {
            createNewButtonLess();
          }
        }

        indexPagination = reserveVariables - indexPagination;
        addClassButton();
      } //функция поиска номера крайней картинки


      function findNumberImage(n) {
        var buttonArr = document.querySelectorAll('.img-navigation');
        indexStartImg = 0;

        for (; indexStartImg < buttonArr.length; indexStartImg++) {
          return indexStartImg = buttonArr[n].innerText;
        }
      }

      function clearPagination() {
        while (paginationImgBlock.firstChild) {
          paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }
      }

      var numberPushButton = 0;

      paginationImgBlock.onclick = function (event) {
        var target = event.target;

        if (target.id === "moreImg") {
          showMoreAmountImage();
        } else if (target.id === "lessImg") {
          showLessAmountImage();
        } else if (target.id !== "lessImg" && "moreImg") {
          numberPushButton = +target.innerText;
          containsActiveClass(target.innerText);
        }
      };

      function findActiveImg() {
        slides = document.querySelectorAll('.slide-single');

        for (; indexActiveImg < links.length; indexActiveImg++) {
          if (links[indexActiveImg] === slides[1].src) {
            return indexActiveImg;
          }
        }
      }

      function addClassButton() {
        var indexActiveButton = 0;
        findActiveImg();
        indexActiveImg++;
        var buttonArr = document.querySelectorAll('.img-navigation');
        var buttonMore = document.getElementById('moreImg');
        var buttonLess = document.getElementById('lessImg');

        for (; indexActiveButton < buttonArr.length; indexActiveButton++) {
          buttonArr[indexActiveButton].classList.remove('active');

          if (!!buttonMore) {
            buttonMore.classList.remove('active');
          }

          if (!!buttonLess) {
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
      }

      function containsActiveClass(x) {
        var numButton = +x;
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (var i = 0; i < buttonArr.length; i++) {
          if (numButton === +buttonArr[i].innerText) {
            if (buttonArr[i].classList.contains('active')) {
              break;
            } else {
              showNotActiveImg(x);
            }
          }
        }
      }

      function showNotActiveImg(x) {
        var numButton = +x;
        var b = 0;
        var indexWaitImage = 0;
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (; indexWaitImage <= links.length; indexWaitImage++) {
          if (indexWaitImage === numButton) {
            for (; b < buttonArr.length; b++) {
              if (+buttonArr[b].innerText === numButton) {
                if (!buttonArr[b].classList.contains('active')) {
                  if (indexWaitImage > b) {
                    addNextImageFromPagination();
                    break;
                  } else if (indexWaitImage < b) {
                    addPrevImageFromPagination();
                    break;
                  }
                }
              }
            }
          }
        }
      }

      function addNextImageFromPagination() {
        var linkNewImage = 0;
        var rightImg = document.createElement('img');

        for (var i = 0; i < links.length; i++) {
          if (i + 1 === numberPushButton) {
            linkNewImage = links[i];
            break;
          }
        }

        slides[0].remove();
        slides[2].remove();
        rightImg.src = linkNewImage;
        rightImg.classList.add('slide-single');
        rightImg.style.left = 100 + '%';
        sliderBlock.appendChild(rightImg);
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step2 = 0;

        for (var _i2 = 0; _i2 < slides.length; _i2++) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2++;
          }

          slides[_i2].style.left = offset * 100 - 100 + '%';
        }

        findIndexLastImg(slides[1]);
        addNextImage();
        slides[0].remove();
        findIndexLastImg(slides[1]);
        addPrevImage();
        addClassButton();
        numberPushButton = 0;
      }

      function addPrevImageFromPagination() {
        var linkNewImage = 0;
        var leftImg = document.createElement('img');
        console.log(numberPushButton);

        for (var i = 0; i < links.length; i++) {
          if (i + 1 === numberPushButton) {
            linkNewImage = links[i];
            break;
          }
        }

        console.log(linkNewImage);
        slides[0].remove();
        slides[2].remove();
        leftImg.src = linkNewImage;
        leftImg.classList.add('slide-single');
        leftImg.style.left = -100 + '%';
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step3 = slides.length;

        for (var _i3 = slides.length - 1; _i3 >= 0; _i3--) {
          if (step3 > 0) {
            offset = 1;
            step3--;
          } else {
            offset = 0;
          }

          slides[_i3].style.left = offset * 100 + '%';
          step3--;
        }

        findIndexLastImg(slides[0]);
        addPrevImage();
        slides[1].remove();
        findIndexLastImg(slides[0]);
        addNextImage();
        addClassButton();
        numberPushButton = 0;
      }
    };
  }, {}]
}, {}, [1]);