const mobileMenuIcon = document.querySelector('.mobile-menu');
const mobileMenu = document.querySelector('.mobile-navigation');
const closeMobMenu = document.querySelector('.close-mobile-nav');

mobileMenuIcon.onclick = (e) => {
  e.preventDefault();
  mobileMenu.classList.add('show-nav');
  setTimeout(() => {
    mobileMenu.classList.add('visible-nav');
  }, 10);
};


closeMobMenu.onclick = (e) => {
  e.preventDefault();
  mobileMenu.classList.remove('visible-nav');
  setTimeout(() => {
    mobileMenu.classList.remove('show-nav');
  }, 1000);
};
