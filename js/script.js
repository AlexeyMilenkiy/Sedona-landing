window.onload = function(){
  
  let mobileMenuIcon = document.querySelector('.mobile-menu');
  let mobileMenu = document.querySelector('.mobile-navigation');
  let closeMobMenu = document.querySelector('.close-mobile-nav');
  let navigation = document.querySelector('.header__nav');

  var validate = require("validate.js");

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

  let form = document.querySelector(".main-form");
  form.addEventListener('submit', event =>{
    event.preventDefault();

     const formData = {
      name: form.name.value,
      surname: form.surname.value,
      email: form.email.value,
      tel: form.tel.value
     }
     validate.collectFormValues(formData);

     console.log(formData, validate.collectFormValues(form));
  });
 
}
