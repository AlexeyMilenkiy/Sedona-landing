window.onload = function(){
  
  let mobileMenuIcon = document.querySelector('.mobile-menu');
  let mobileMenu = document.querySelector('.mobile-navigation');
  let closeMobMenu = document.querySelector('.close-mobile-nav');
  let navigation = document.querySelector('.header__nav');

  let mainForm = document.querySelector('.main-form');
  let emailUser = document.querySelector('.email');
  let telUser = document.querySelector('.tel');

  mobileMenuIcon.onclick = () => {
    mobileMenu.style.display = "block";
    mobileMenu.style.position = "fixed";
    mobileMenuIcon.style.display = "none";
    navigation.style.display = "none";
  }; 

  closeMobMenu.onclick = () => {
    mobileMenu.style.display = "none";
    mobileMenu.style.position = "absolute";
    mobileMenuIcon.style.display = "block";
    navigation.style.display = "block";
  };

}
