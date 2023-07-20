const btn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.header__inner');

btn.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
});
