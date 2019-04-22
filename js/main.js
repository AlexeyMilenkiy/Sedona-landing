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

      require('./slider/slider-img.js');

      require('./slider/slider-pagination.js');
    };
  }, {
    "./slider.js": 2,
    "./slider/slider-img.js": 3,
    "./slider/slider-pagination.js": 4
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
      var indexPagination = 3; //  number of buttons pagination

      var indexStartNumButton = 0;
      var indexActiveImg = 0;
      var numberPushButton = 0;
      var activeButton = 0;
      var linkNewImage = 0;
      var isFlagAction = false;
      showImage();
      showPagination(); // create array with links images on slider

      function findLinksImg() {
        for (var i = 0; i < slides.length; i++) {
          links[i] = slides[i].src;
          slides[i].remove();
        }
      } // start function create images on pages


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
      } // start function create pagination button


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
      } // find link active image after shift


      function findIndexLastImg(arg) {
        for (; imgIndex < links.length; imgIndex++) {
          if (links[imgIndex] === arg.src) {
            return imgIndex;
          }
        }
      } // add new image on the right after shift


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
      } // add new image on the left after shift


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
      } // image shift function to the left


      function shiftImageLeft() {
        offset = 0;
        var step2 = 0;

        for (var i = 0; i < slides.length; i++) {
          if (step2 + 1 === slides.length) {
            offset = 1;
          } else {
            offset = 0;
            step2++;
          }

          slides[i].style.left = offset * 100 - 100 + '%';
        }
      } //function showing new image after pressing a button "next"


      function showNextImage() {
        if (isFlagAction) {
          return false;
        } else {
          slides = document.querySelectorAll('.slide-single');
          findIndexLastImg(slides[2]);
          slides[0].remove();
          shiftImageLeft();
          isFlagAction = true;
          setTimeout(function () {
            addNextImage();
            addClassButton();
            isFlagAction = false;
          }, 2000);
        }
      } // image shift function to the rights


      function shiftImageRight() {
        offset = 0;
        var step3 = slides.length;

        for (var i = slides.length - 1; i >= 0; i--) {
          if (step3 - 1 > 0) {
            offset = 1;
            step3--;
          } else {
            offset = 0;
          }

          slides[i].style.left = offset * 100 + '%';
        }
      } //function showing new image after pressing a button "previous"


      function showPrevImage() {
        if (isFlagAction) {
          return false;
        } else {
          slides = document.querySelectorAll('.slide-single');
          offset = 0;
          findIndexLastImg(slides[0]);
          slides[2].remove();
          shiftImageRight();
          isFlagAction = true;
          setTimeout(function () {
            addPrevImage();
            addClassButton();
            isFlagAction = false;
          }, 2000);
        }
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
      } // creating a new button with a number greater than the previous one


      function createNewButtonMore() {
        var imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartNumButton + 1;
        paginationImgBlock.appendChild(imgNumber);
      } // creating a new button with a number less than the previous one


      function createNewButtonLess() {
        var imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartNumButton - 1;
        paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
      } //show new pagination button after push button ">>"


      function showNextPagination() {
        searchLastNumberButton(indexPagination);
        clearPagination();
        showButtonLess();
        var reserveVariables = +indexStartNumButton;
        indexPagination = +indexStartNumButton + indexPagination;

        if (indexPagination === links.length) {
          for (+indexStartNumButton; +indexStartNumButton < indexPagination; +indexStartNumButton++) {
            createNewButtonMore();
          }
        } else if (indexPagination < links.length) {
          for (+indexStartNumButton; +indexStartNumButton < indexPagination; +indexStartNumButton++) {
            createNewButtonMore();
          }

          showButtonMore();
        } else {
          for (+indexStartNumButton; +indexStartNumButton < links.length; +indexStartNumButton++) {
            createNewButtonMore();
          }
        }

        indexPagination = indexPagination - reserveVariables;
        addClassButton();
      } //show new pagination button after push button "<<"


      function showPrevPagination() {
        searchLastNumberButton(1);
        clearPagination();
        showButtonMore();
        var reserveVariables = +indexStartNumButton;
        indexPagination = +indexStartNumButton - indexPagination;

        if (indexPagination > 1) {
          for (+indexStartNumButton; +indexStartNumButton > indexPagination; +indexStartNumButton--) {
            createNewButtonLess();
          }

          var lessImg = document.createElement('button');
          lessImg.classList.add('lessImg-class');
          lessImg.id = "lessImg";
          lessImg.textContent = "<<";
          paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]);
        } else {
          for (+indexStartNumButton; +indexStartNumButton > 1; +indexStartNumButton--) {
            createNewButtonLess();
          }
        }

        indexPagination = reserveVariables - indexPagination;
        addClassButton();
      } // search for the number of the last button pagination


      function searchLastNumberButton(n) {
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (var i = 0; i < buttonArr.length; i++) {
          if (i + 1 === n) {
            return indexStartNumButton = buttonArr[i].innerText;
          }
        }
      } // clear all button pagination


      function clearPagination() {
        while (paginationImgBlock.firstChild) {
          paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }
      }

      paginationImgBlock.onclick = function (event) {
        var target = event.target;

        if (target.id === "moreImg") {
          showNextPagination();
        } else if (target.id === "lessImg") {
          showPrevPagination();
        } else if (target.id !== "lessImg" && "moreImg") {
          numberPushButton = +target.innerText;
          containsActiveClass(target.innerText);
        }
      }; // active image index definition


      function searchActiveImg() {
        slides = document.querySelectorAll('.slide-single');

        for (; indexActiveImg < links.length; indexActiveImg++) {
          if (links[indexActiveImg] === slides[1].src) {
            return indexActiveImg;
          }
        }
      } //adding "active" class to a button


      function addClassButton() {
        var indexActiveButton = 0;
        searchActiveImg();
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
      } //checking whether the active class has a button


      function containsActiveClass(x) {
        var numButton = +x;
        var buttonArr = document.querySelectorAll('.img-navigation');

        for (var i = 0; i < buttonArr.length; i++) {
          if (numButton === +buttonArr[i].innerText) {
            if (buttonArr[i].classList.contains('active')) {
              break;
            } else {
              showNotActiveImg();
              break;
            }
          }
        }
      } // brute force pagination array


      function bruteForcePagination() {
        var buttonArr = document.querySelectorAll('.img-navigation');
        var lessButton = document.getElementById('lessImg');
        var moreButton = document.getElementById('moreImg');

        if (lessButton) {
          if (lessButton.classList.contains('active')) {
            return activeButton = -1;
          }
        }

        if (moreButton) {
          if (moreButton.classList.contains('active')) {
            return activeButton = links.length + 1;
          }
        }

        for (var i = 0; i < buttonArr.length; i++) {
          if (buttonArr[i].classList.contains('active')) {
            activeButton = +buttonArr[i].innerText;
          }
        }
      } //showing a new image after pressing a button pagination


      function showNotActiveImg() {
        var indexWaitImage = 0;
        var buttonArr = document.querySelectorAll('.img-navigation');
        bruteForcePagination();

        outer: for (; indexWaitImage <= links.length; indexWaitImage++) {
          if (indexWaitImage === numberPushButton) {
            for (var i = 0; i < buttonArr.length; i++) {
              if (+buttonArr[i].innerText === numberPushButton) {
                if (indexWaitImage > activeButton) {
                  addNextImageFromPagination();
                  break outer;
                } else {
                  addPrevImageFromPagination();
                  break outer;
                }
              }
            }
          }
        }
      } //search for a link to a picture of the corresponding pressed button


      function searchIndexNewImage() {
        for (var i = 0; i < links.length; i++) {
          if (i + 1 === numberPushButton) {
            linkNewImage = links[i];
            break;
          }
        }
      } //adding a new image after pressing the button with the number more than the active one


      function addNextImageFromPagination() {
        if (isFlagAction) {
          return false;
        } else {
          var rightImg = document.createElement('img');
          searchIndexNewImage();
          slides[0].remove();
          slides[2].remove();
          rightImg.src = linkNewImage;
          rightImg.classList.add('slide-single');
          rightImg.style.left = 100 + '%';
          sliderBlock.appendChild(rightImg);
          slides = document.querySelectorAll('.slide-single');
          isFlagAction = true;
          setTimeout(function () {
            shiftImageLeft();
          }, 200);
          setTimeout(function () {
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
        }
      } //adding a new image after pressing the button with the number less than the active one


      function addPrevImageFromPagination() {
        if (isFlagAction) {
          return false;
        } else {
          var leftImg = document.createElement('img');
          searchIndexNewImage();
          slides[0].remove();
          slides[2].remove();
          leftImg.src = linkNewImage;
          leftImg.classList.add('slide-single');
          leftImg.style.left = -100 + '%';
          sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
          slides = document.querySelectorAll('.slide-single');
          isFlagAction = true;
          setTimeout(function () {
            shiftImageRight();
          }, 200);
          setTimeout(function () {
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
        }
      }
    };
  }, {}],
  3: [function (require, module, exports) {}, {}],
  4: [function (require, module, exports) {
    arguments[4][3][0].apply(exports, arguments);
  }, {
    "dup": 3
  }]
}, {}, [1]);