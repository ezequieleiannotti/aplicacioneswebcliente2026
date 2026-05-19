// js/carrito.js
// Manejo del estado del carrito usando localStorage

// Estado global del carrito
let carrito = [];

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDeLocalStorage();
  renderizarCarrito();

  // Evento para finalizar compra (ir a checkout)
  const btnFinalizar = document.getElementById("btn-finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
      }
      window.location.href = "checkout.html";
    });
  }
});

function cargarCarritoDeLocalStorage() {
  const guardado = localStorage.getItem("carritoEcommerce");
  if (guardado) {
    carrito = JSON.parse(guardado);
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carritoEcommerce", JSON.stringify(carrito));
}

// Expone las funciones globalmente
window.agregarAlCarrito = function(producto) {
  // Verificamos si el producto ya existe en el carrito
  const existe = carrito.find(item => item.id === producto.id);
  
  if (existe) {
    existe.cantidad++;
  } else {
    // Agregamos una copia del producto con cantidad inicial 1
    carrito.push({ ...producto, cantidad: 1 });
  }
  
  guardarCarritoEnLocalStorage();
  renderizarCarrito();
  
  // Opcional: mostrar un mensajito o animación
  mostrarNotificacion(`"${producto.nombre}" añadido al carrito`);
};

window.eliminarDelCarrito = function(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarritoEnLocalStorage();
  renderizarCarrito();
};

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items-container");
  const totalTexto = document.getElementById("carrito-total-texto");
  const badges = document.querySelectorAll(".badge");
  
  if (!contenedor || !totalTexto) return;

  contenedor.innerHTML = "";
  let totalPrecio = 0;
  let totalCantidad = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p style='text-align: center; color: #64748b; margin: 10px 0;'>El carrito está vacío</p>";
  } else {
    carrito.forEach(item => {
      totalPrecio += item.precio * item.cantidad;
      totalCantidad += item.cantidad;

      const itemDiv = document.createElement("div");
      itemDiv.className = "carrito-item";
      
      const imagenSrc = item.imagen && item.imagen !== "" ? item.imagen : "https://placehold.co/40x40?text=App";
      
      itemDiv.innerHTML = `
        <img src="${imagenSrc}" alt="${item.nombre}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" />
        <div class="carrito-info">
          <div class="carrito-titulo">${item.nombre} ${item.cantidad > 1 ? `(x${item.cantidad})` : ''}</div>
          <div class="carrito-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
        </div>
        <button class="btn-eliminar" aria-label="Eliminar" title="Eliminar" onclick="eliminarDelCarrito(${item.id})" 
          style="margin-left: auto; background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.2rem; padding: 0 5px;" 
          onmouseover="this.style.color='#dc2626'" onmouseout="this.style.color='#ef4444'">✖</button>
      `;
      contenedor.appendChild(itemDiv);
    });
  }

  // Actualizamos el total de dinero
  totalTexto.textContent = `Total: $${totalPrecio.toFixed(2)}`;

  // Actualizamos todos los badges (puede haber uno en mobile y otro en desktop)
  badges.forEach(badge => {
    badge.textContent = totalCantidad;
  });

  renderizarCheckoutSummary(totalPrecio);
}

function renderizarCheckoutSummary(totalPrecio) {
  const summaryContainer = document.querySelector(".order-summary");
  // Si no estamos en la página de checkout, salir
  if (!summaryContainer) return;
  
  // Limpiamos el contenido actual (excepto el h3 y el p final)
  summaryContainer.innerHTML = "<h3>Resumen de tu Orden</h3>";
  
  if (carrito.length === 0) {
    summaryContainer.innerHTML += "<p style='text-align: center; color: #64748b;'>El carrito está vacío</p>";
    return;
  }
  
  carrito.forEach(item => {
    const div = document.createElement("div");
    div.className = "summary-item";
    div.innerHTML = `
      <span>${item.nombre} (x${item.cantidad})</span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
    `;
    summaryContainer.appendChild(div);
  });
  
  // Subtotal, Impuestos, Total
  const subtotalDiv = document.createElement("div");
  subtotalDiv.className = "summary-item";
  subtotalDiv.style = "color: #64748b; margin-top: 1rem;";
  subtotalDiv.innerHTML = `
    <span>Subtotal</span>
    <span>$${totalPrecio.toFixed(2)}</span>
  `;
  summaryContainer.appendChild(subtotalDiv);
  
  const impuestos = totalPrecio * 0.21;
  const impuestosDiv = document.createElement("div");
  impuestosDiv.className = "summary-item";
  impuestosDiv.style = "color: #64748b;";
  impuestosDiv.innerHTML = `
    <span>Impuestos (21%)</span>
    <span>$${impuestos.toFixed(2)}</span>
  `;
  summaryContainer.appendChild(impuestosDiv);
  
  const totalDiv = document.createElement("div");
  totalDiv.className = "summary-total";
  totalDiv.innerHTML = `
    <span>Total</span>
    <span>$${(totalPrecio + impuestos).toFixed(2)}</span>
  `;
  summaryContainer.appendChild(totalDiv);
  
  const disclaimer = document.createElement("p");
  disclaimer.style = "font-size: 0.85rem; color: #64748b; margin-top: 1.5rem; text-align: center;";
  disclaimer.textContent = "Al confirmar tu pedido, aceptas nuestros Términos y Condiciones.";
  summaryContainer.appendChild(disclaimer);
}

function mostrarNotificacion(mensaje) {
  // Implementación sencilla de un "toast"
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "var(--color-primario)";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s, transform 0.3s";
  toast.style.transform = "translateY(20px)";
  
  document.body.appendChild(toast);
  
  // Forzar un reflow para que la animación funcione
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
