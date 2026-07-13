// ─────────────────────────────────────────────
// EVENTO: envío del formulario de checkout
// Valida el envío, limpia el carrito y muestra el mensaje de compra exitosa.
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', function (evento) {
    // Evita que el navegador recargue la página al enviar el formulario.
    evento.preventDefault();
    localStorage.removeItem('carritoEcommerce');

    // Creamos un modal visual para confirmar que la compra terminó.
    const modal = document.createElement('div');
    Object.assign(modal.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: '9999',
      backdropFilter: 'blur(4px)'
    });

    const modalContent = document.createElement('div');
    Object.assign(modalContent.style, {
      backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '16px',
      textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      maxWidth: '400px', width: '90%',
      transform: 'scale(0.8)', opacity: '0',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    modalContent.innerHTML = `
      <div style="width: 80px; height: 80px; background-color: #10b981; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 1.5rem auto; color: white; font-size: 2.5rem;">✓</div>
      <h2 style="color: #1e293b; margin-bottom: 0.5rem; font-size: 1.8rem;">¡Compra Exitosa!</h2>
      <p style="color: #64748b; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.5;">Tu pedido fue procesado correctamente. ¡Gracias por confiar en nosotros!</p>
      <button id="btn-modal-ok" style="background: linear-gradient(135deg, var(--color-primario) 0%, #3b82f6 100%); color: white; border: none; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: bold; border-radius: 99px; cursor: pointer; width: 100%;">Volver al Inicio</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Activa la animación de entrada después de insertar el modal en el DOM.
    setTimeout(() => {
      modalContent.style.transform = 'scale(1)';
      modalContent.style.opacity = '1';
    }, 10);

    // Cierra el modal y vuelve a la página principal.
    document.getElementById('btn-modal-ok').addEventListener('click', function () {
      modalContent.style.transform = 'scale(0.8)';
      modalContent.style.opacity = '0';
      setTimeout(() => { window.location.href = 'index.html'; }, 300);
    });
  });
});
