window.onload = function(){
  
  let mobileMenuIcon = document.querySelector('.mobile-menu');
  let mobileMenu = document.querySelector('.mobile-navigation');
  let closeMobMenu = document.querySelector('.close-mobile-nav');
  let navigation = document.querySelector('.header__nav');
  var validate = require("validate.js");

  mobileMenuIcon.onclick = (e) => {
    e.preventDefault();
    mobileMenu.classList.add("show-nav");
  }; 

  closeMobMenu.onclick = (e) => {    
    e.preventDefault();
    mobileMenu.classList.remove("show-nav");
  };

  function ValidationErrors(errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor);
  this.errors = errors;
  this.options = options;
  this.attributes = attributes;
  this.constraints = constraints;
  };
    var constraints = {
  name: {
    presence: true,
    length: {minimum: 3}
  },
  surname :{
    presence: true,
    length: {minimum: 3}
  },
  email: {
    email: true
  },
  tel: {
    length: {minimum: 3}
  }
  };

  ValidationErrors.prototype = new Error();

  function success(attributes) {
    console.log("Success!", attributes);
  };

  function error(errors) {
    if (errors instanceof Error) {
      // This means an exception was thrown from a validator
      console.err("An error ocurred", errors);
   } else {
      console.log("Validation errors", errors);
    }
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
     validate.collectFormValues(formData, constraints); 

      console.log("ValidationErrors", error);
  });
}
