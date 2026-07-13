// EVENTO: DOMContentLoaded
// Espera a que el HTML esté listo y configura el menú responsive de navegación.

document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const nav = document.querySelector('header nav');

  if (!hamburgerBtn || !nav) return;

  // Abre o cierra el menú cuando el usuario pulsa el botón hamburguesa.
  hamburgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('nav-open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.innerHTML = isOpen ? '&#x2715;' : '&#x2630;';
  });

  // Cierra el menú después de que el usuario elige una opción.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#x2630;';
    });
  });

  // Cierra el menú si se hace clic fuera del encabezado.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('header')) {
      nav.classList.remove('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#x2630;';
    }
  });
});
