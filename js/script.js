window.onload = function(){

  require ('./slider.js');  
  let mobileMenuIcon = document.querySelector('.mobile-menu');
  let mobileMenu = document.querySelector('.mobile-navigation');
  let closeMobMenu = document.querySelector('.close-mobile-nav');
  let navigation = document.querySelector('.header__nav');

  mobileMenuIcon.onclick = (e) => {
    e.preventDefault();
    mobileMenu.classList.add("show-nav");
  }; 

  closeMobMenu.onclick = (e) => {    
    e.preventDefault();
    mobileMenu.classList.remove("show-nav");
  };
}
