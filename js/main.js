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
      showImage();
      showPagination();

      function findLinksImg() {
        for (var _i = 0; _i < slides.length; _i++) {
          links[_i] = slides[_i].src;

          slides[_i].remove();
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
          for (var _i2 = 0; _i2 < indexPagination; _i2++) {
            var imgNumber = document.createElement('button');
            imgNumber.classList.add('img-navigation');
            imgNumber.textContent = _i2 + 1;
            paginationImgBlock.appendChild(imgNumber);
          }

          showButtonMore();
        } else if (links.length <= indexPagination) {
          for (var _i3 = 0; _i3 < links.length; _i3++) {
            var _imgNumber = document.createElement('button');

            _imgNumber.classList.add('img-navigation');

            _imgNumber.textContent = _i3 + 1;
            paginationImgBlock.appendChild(_imgNumber);
          }
        }
      }

      function findIndexLastImg(arg) {
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
      }

      function addPrevImage() {
        var leftImg = document.createElement('img');

        if (imgIndex === -1) {
          imgIndex = links.length - 1;
        } else {
          imgIndex = imgIndex - 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single');
        leftImg.style.left = -100 + '%';
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
      }

      function showNextImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step2 = 0;
        findIndexLastImg(slides[2]);
        slides[0].remove();

        for (var _i4 = 0; _i4 < slides.length; _i4++) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2++;
          }

          slides[_i4].style.left = offset * 100 - 100 + '%';
        }

        setTimeout(function () {
          addNextImage();
          addClassButton();
        }, 3000);
      }

      function showPrevImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        var step3 = slides.length;
        findIndexLastImg(slides[0]);
        slides[2].remove();

        for (var _i5 = slides.length - 1; _i5 >= 0; _i5--) {
          if (step3 - 1 > 0) {
            offset = 1;
            step3--;
          } else {
            offset = 0;
          }

          slides[_i5].style.left = offset * 100 + '%';
        }

        setTimeout(function () {
          addPrevImage();
          addClassButton();
        }, 3000);
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
      }

      function findNumberImage(n) {
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (indexStartImg = 0; indexStartImg < buttonArr.length; i++) {
          return indexStartImg = buttonArr[n].innerText;
        }
      }

      function clearPagination() {
        while (paginationImgBlock.firstChild) {
          paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }
      }

      paginationImgBlock.onclick = function (event) {
        var target = event.target; // где был клик?

        if (target.id === "moreImg") {
          showMoreAmountImage();
        } else if (target.id === "lessImg") {
          showLessAmountImage();
        }
      }; // функция соединения активной картинки и пагинации


      var indexActiveImg = 0;

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
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (; indexActiveButton < buttonArr.length; indexActiveButton++) {
          buttonArr[indexActiveButton].classList.remove('active');

          if (indexActiveImg > buttonArr.length - 1) {
            document.getElementById('moreImg').classList.add('active');
          } else if (indexActiveButton === indexActiveImg) {
            buttonArr[indexActiveButton].classList.add('active');
            indexActiveImg = 0;
          }
        }
      }

      addClassButton();
    };
  }, {}]
}, {}, [1]);