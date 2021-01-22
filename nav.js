const burger = document.querySelector('.burger-icon');

const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');

const navLinks = document.querySelector('.nav-links-container');

burger.addEventListener('click', () => {
      line1.classList.toggle('line1-opened');
      line2.classList.toggle('line2-opened');
      line3.classList.toggle('line3-opened');

      navLinks.classList.toggle('side-menu-visible');
      navLinks.style.transition = "all 0.4s ease";
});
