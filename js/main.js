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
      var slides = document.querySelectorAll('.slide-single');
      console.log(slides);
      var slider = [];

      for (var i = 0; i < slides.length; i++) {
        slider[i] = slides[i].src;
        slides[i].remove();
      }

      console.log(slider);
      var step = 0;
      var offset = 0;

      function draw() {
        var img = document.createElement('img');
        img.src = slider[step];
        img.classList.add('slide-single');
        img.style.left = offset * 806 + 'px';
        document.querySelector('.slider').appendChild(img);

        if (step + 1 === slider.length) {
          step = 0;
        } else {
          step++;
        }

        offset = 1;
      }

      function left() {
        document.onclick = null;
        var slides2 = document.querySelectorAll('.slide-single');
        var offset2 = 0;

        for (var _i = 0; _i < slides2.length; _i++) {
          slides2[_i].style.left = offset2 * 806 - 806 + 'px';
          offset2++;
        }

        setTimeout(function () {
          slides2[0].remove();
          draw();
          document.onclick = left;
        }, 3000);
      }

      draw();
      draw();
      document.onclick = left;
    };
  }, {}]
}, {}, [1]);