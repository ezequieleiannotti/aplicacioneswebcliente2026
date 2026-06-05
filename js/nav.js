// js/nav.js
// Menú hamburguesa para mobile

document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const nav = document.querySelector('header nav');

  if (!hamburgerBtn || !nav) return;

  hamburgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('nav-open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.innerHTML = isOpen ? '&#x2715;' : '&#x2630;';
  });

  // Cerrar al hacer click en un link
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#x2630;';
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', function (e) {
    if (!e.target.closest('header')) {
      nav.classList.remove('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#x2630;';
    }
  });
});
