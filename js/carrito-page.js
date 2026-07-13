// ─────────────────────────────────────────────
// FUNCIÓN: actualizarVistaCarritoPage()
// Actualiza el resumen de precios y muestra u oculta las acciones del carrito.
// Lee el estado guardado en localStorage para mantener sincronizada esta página.
// ─────────────────────────────────────────────
function actualizarVistaCarritoPage() {
  const resumen = document.getElementById('resumen-precios');
  const acciones = document.getElementById('carrito-acciones');
  const carritoGuardado = JSON.parse(localStorage.getItem('carritoEcommerce') || '[]');

  const totalPrecio = carritoGuardado.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const impuestos = totalPrecio * 0.21;

  if (carritoGuardado.length > 0) {
    resumen.style.display = 'block';
    acciones.style.display = 'flex';
    document.getElementById('subtotal-texto').textContent = `$${totalPrecio.toFixed(2)}`;
    document.getElementById('impuestos-texto').textContent = `$${impuestos.toFixed(2)}`;
    document.getElementById('carrito-total-texto').textContent = `$${(totalPrecio + impuestos).toFixed(2)}`;
  } else {
    resumen.style.display = 'none';
    acciones.style.display = 'none';
  }
}

// Esperamos a que el HTML esté listo para conectar eventos y observar cambios.
document.addEventListener('DOMContentLoaded', function () {
  actualizarVistaCarritoPage();

  // Cada vez que se re-renderiza el carrito, actualizamos también los totales.
  const observer = new MutationObserver(actualizarVistaCarritoPage);
  const contenedor = document.getElementById('carrito-items-container');
  if (contenedor) {
    observer.observe(contenedor, { childList: true, subtree: true });
  }

  // Lleva al usuario al formulario de pago.
  const btnIrPagar = document.getElementById('btn-ir-pagar');
  if (btnIrPagar) {
    btnIrPagar.addEventListener('click', function () {
      window.location.href = 'checkout.html';
    });
  }
});
