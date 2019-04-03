"use strict";

window.onload = function () {
  var mobileMenuIcon = document.querySelector('.mobile-menu');
  var mobileMenu = document.querySelector('.mobile-navigation');
  var closeMobMenu = document.querySelector('.close-mobile-nav');
  var navigation = document.querySelector('.header__nav');
  var mainForm = document.querySelector('.main-form');
  var emailUser = document.querySelector('.email');
  var telUser = document.querySelector('.tel');

  mobileMenuIcon.onclick = function () {
    mobileMenu.style.display = "block";
    mobileMenu.style.position = "fixed";
    mobileMenuIcon.style.display = "none";
    navigation.style.display = "none";
  };

  closeMobMenu.onclick = function () {
    mobileMenu.style.display = "none";
    mobileMenu.style.position = "absolute";
    mobileMenuIcon.style.display = "block";
    navigation.style.display = "block";
  };
};