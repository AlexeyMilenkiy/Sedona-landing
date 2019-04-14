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
      var links = [];
      var imgIndex = 0;
      var offset = 0;
      showImage();
      next.onclick = showNextImage;
      previous.onclick = showPrevImage;

      function findLinksImg() {
        for (var i = 0; i < slides.length; i++) {
          links[i] = slides[i].src;
          slides[i].remove();
        }
      }

      function showImage() {
        findLinksImg();
        imgIndex = 1;
        var offset1 = 1;
        var img = document.createElement('img');
        var img1 = document.createElement('img');
        var img2 = document.createElement('img');
        img.src = links[imgIndex - 1];
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
        }, 3000);
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
        }, 3000);
      }
    };
  }, {}]
}, {}, [1]);