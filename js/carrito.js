// MÓDULO: carrito de compras
// Administra productos, cantidades, stock, totales y persistencia en localStorage.

// Estado global del carrito
let carrito = [];

// Inicializa el carrito y conecta el botón de finalizar compra cuando carga la página.
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDeLocalStorage();
  renderizarCarrito();

  // Evento para finalizar compra (ir al resumen del carrito)
  const btnFinalizar = document.getElementById("btn-finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
      }
      window.location.href = "carrito.html";
    });
  }
});

// ─────────────────────────────────────────────
// FUNCIÓN: cargarCarritoDeLocalStorage()
// Recupera el carrito guardado anteriormente en el navegador.
// ─────────────────────────────────────────────
function cargarCarritoDeLocalStorage() {
  const guardado = localStorage.getItem("carritoEcommerce");
  if (guardado) {
    carrito = JSON.parse(guardado);
  }
}

// ─────────────────────────────────────────────
// FUNCIÓN: guardarCarritoEnLocalStorage()
// Convierte el carrito a JSON y lo guarda para conservarlo entre páginas.
// ─────────────────────────────────────────────
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carritoEcommerce", JSON.stringify(carrito));
}

// ─────────────────────────────────────────────
// FUNCIÓN: agregarAlCarrito(producto)
// Agrega una unidad, valida el stock y actualiza la base de datos y la interfaz.
// Se expone en window porque las tarjetas de productos la invocan desde el HTML.
// ─────────────────────────────────────────────
window.agregarAlCarrito = function(producto) {
  // Usamos listadoProductos como fuente de verdad del stock actual
  const productoActual = (typeof listadoProductos !== 'undefined')
    ? listadoProductos.find(p => p.id === producto.id)
    : producto;

  const stockActual = productoActual && productoActual.stock !== undefined
    ? productoActual.stock
    : undefined;

  // Verificar stock antes de agregar
  if (stockActual !== undefined && stockActual <= 0) {
    mostrarNotificacion('Sin stock disponible para este producto');
    return;
  }

  // Verificamos si el producto ya existe en el carrito
  const existe = carrito.find(item => item.id === producto.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();
  mostrarNotificacion(`"${producto.nombre}" añadido al carrito`);

  // Actualizar stock localmente y en Supabase
  if (stockActual !== undefined && productoActual) {
    const nuevoStock = stockActual - 1;
    productoActual.stock = nuevoStock;

    // Actualizar DOM
    const stockEl = document.getElementById(`stock-${producto.id}`);
    if (stockEl) {
      stockEl.textContent = nuevoStock > 0 ? `Stock disponible: ${nuevoStock}` : 'Sin stock';
      stockEl.style.color = nuevoStock <= 3 ? '#ef4444' : 'var(--color-texto-suave)';
    }

    const btn = document.getElementById(`btn-carrito-${producto.id}`);
    if (btn && nuevoStock <= 0) {
      btn.disabled = true;
      btn.textContent = 'Agotado';
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
    }

    // Persistir en Supabase (sin bloquear la UI)
    if (typeof SUPABASE_URL !== 'undefined') {
      fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${producto.id}`, {
        method: 'PATCH',
        headers: SUPABASE_HEADERS,
        body: JSON.stringify({ stock: nuevoStock })
      }).catch(err => console.error('Error actualizando stock:', err));
    }
  }
};

// ─────────────────────────────────────────────
// FUNCIÓN: cambiarCantidad(id, delta)
// Aumenta o reduce la cantidad de un producto y ajusta el stock correspondiente.
// ─────────────────────────────────────────────
window.cambiarCantidad = function(id, delta) {
  const itemEnCarrito = carrito.find(item => item.id === id);
  if (!itemEnCarrito) return;

  const productoActual = (typeof listadoProductos !== 'undefined')
    ? listadoProductos.find(p => p.id === id)
    : null;

  if (delta === 1) {
    // Verificar que haya stock disponible antes de sumar
    const stockActual = productoActual ? productoActual.stock : undefined;
    if (stockActual !== undefined && stockActual <= 0) {
      mostrarNotificacion('No hay más stock disponible');
      return;
    }

    itemEnCarrito.cantidad++;

    // Descontar stock
    if (productoActual && productoActual.stock !== undefined) {
      const nuevoStock = productoActual.stock - 1;
      productoActual.stock = nuevoStock;

      const stockEl = document.getElementById(`stock-${id}`);
      if (stockEl) {
        stockEl.textContent = nuevoStock > 0 ? `Stock disponible: ${nuevoStock}` : 'Sin stock';
        stockEl.style.color = nuevoStock <= 3 ? '#ef4444' : 'var(--color-texto-suave)';
      }

      const btn = document.getElementById(`btn-carrito-${id}`);
      if (btn && nuevoStock <= 0) {
        btn.disabled = true;
        btn.textContent = 'Agotado';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      }

      if (typeof SUPABASE_URL !== 'undefined') {
        fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${id}`, {
          method: 'PATCH',
          headers: SUPABASE_HEADERS,
          body: JSON.stringify({ stock: nuevoStock })
        }).catch(err => console.error('Error actualizando stock:', err));
      }
    }

  } else if (delta === -1) {
    if (itemEnCarrito.cantidad === 1) {
      // Si queda 1, eliminarlo del carrito
      eliminarDelCarrito(id);
      return;
    }

    itemEnCarrito.cantidad--;

    // Restaurar 1 unidad de stock
    if (productoActual && productoActual.stock !== undefined) {
      const nuevoStock = productoActual.stock + 1;
      productoActual.stock = nuevoStock;

      const stockEl = document.getElementById(`stock-${id}`);
      if (stockEl) {
        stockEl.textContent = `Stock disponible: ${nuevoStock}`;
        stockEl.style.color = nuevoStock <= 3 ? '#ef4444' : 'var(--color-texto-suave)';
      }

      const btn = document.getElementById(`btn-carrito-${id}`);
      if (btn && nuevoStock > 0) {
        btn.disabled = false;
        btn.textContent = '🛒';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      }

      if (typeof SUPABASE_URL !== 'undefined') {
        fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${id}`, {
          method: 'PATCH',
          headers: SUPABASE_HEADERS,
          body: JSON.stringify({ stock: nuevoStock })
        }).catch(err => console.error('Error actualizando stock:', err));
      }
    }
  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();
};

// ─────────────────────────────────────────────
// FUNCIÓN: eliminarDelCarrito(id)
// Quita un producto completo del carrito y devuelve sus unidades al stock.
// ─────────────────────────────────────────────
window.eliminarDelCarrito = function(id) {
  const itemEnCarrito = carrito.find(item => item.id === id);
  const cantidadRestaurar = itemEnCarrito ? itemEnCarrito.cantidad : 1;

  carrito = carrito.filter(item => item.id !== id);
  guardarCarritoEnLocalStorage();
  renderizarCarrito();

  // Restaurar stock
  const productoActual = (typeof listadoProductos !== 'undefined')
    ? listadoProductos.find(p => p.id === id)
    : null;

  if (productoActual && productoActual.stock !== undefined) {
    const nuevoStock = productoActual.stock + cantidadRestaurar;
    productoActual.stock = nuevoStock;

    const stockEl = document.getElementById(`stock-${id}`);
    if (stockEl) {
      stockEl.textContent = `Stock disponible: ${nuevoStock}`;
      stockEl.style.color = nuevoStock <= 3 ? '#ef4444' : 'var(--color-texto-suave)';
    }

    const btn = document.getElementById(`btn-carrito-${id}`);
    if (btn) {
      btn.disabled = false;
      btn.textContent = '🛒';
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    }

    if (typeof SUPABASE_URL !== 'undefined') {
      fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${id}`, {
        method: 'PATCH',
        headers: SUPABASE_HEADERS,
        body: JSON.stringify({ stock: nuevoStock })
      }).catch(err => console.error('Error restaurando stock:', err));
    }
  }
};

// ─────────────────────────────────────────────
// FUNCIÓN: renderizarCarrito()
// Dibuja los productos del carrito, actualiza badges y calcula el total visible.
// ─────────────────────────────────────────────
function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items-container");
  const totalTexto = document.getElementById("carrito-total-texto");
  const badges = document.querySelectorAll(".badge");

  // Calculamos totales siempre (los necesita el resumen de checkout también)
  let totalPrecio = 0;
  let totalCantidad = 0;
  carrito.forEach(item => {
    totalPrecio += item.precio * item.cantidad;
    totalCantidad += item.cantidad;
  });

  // Actualizar badges de cantidad siempre
  badges.forEach(badge => {
    badge.textContent = totalCantidad;
  });

  // Si hay panel de carrito en la página (index, catalogo, etc.)
  if (contenedor && totalTexto) {
    // Detectar si el panel estaba abierto antes de re-renderizar
    const carritoDiv = contenedor.closest('.carrito');
    const panelAbierto = carritoDiv && carritoDiv.matches(':focus-within');

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p style='text-align: center; color: #64748b; margin: 10px 0;'>El carrito está vacío</p>";
    } else {
      carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carrito-item";

        const imagenSrc = item.imagen && item.imagen !== "" ? item.imagen : "https://placehold.co/40x40?text=App";

        itemDiv.innerHTML = `
          <img src="${imagenSrc}" alt="${item.nombre}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover; flex-shrink: 0;" />
          <div class="carrito-info" style="flex: 1; min-width: 0;">
            <div class="carrito-titulo" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.nombre}</div>
            <div class="carrito-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <button onclick="cambiarCantidad(${item.id}, -1)"
              style="width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--color-borde); background: var(--color-fondo); color: var(--color-texto); cursor: pointer; font-size: 1rem; line-height: 1; display: flex; align-items: center; justify-content: center;"
              aria-label="Quitar uno">−</button>
            <span style="min-width: 18px; text-align: center; font-weight: 600; font-size: 0.95rem;">${item.cantidad}</span>
            <button onclick="cambiarCantidad(${item.id}, 1)"
              style="width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--color-borde); background: var(--color-fondo); color: var(--color-texto); cursor: pointer; font-size: 1rem; line-height: 1; display: flex; align-items: center; justify-content: center;"
              aria-label="Agregar uno">+</button>
            <button onclick="eliminarDelCarrito(${item.id})"
              style="margin-left: 4px; background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; padding: 0 3px; line-height: 1;"
              aria-label="Eliminar" title="Eliminar"
              onmouseover="this.style.color='#dc2626'" onmouseout="this.style.color='#ef4444'">✖</button>
          </div>
        `;
        contenedor.appendChild(itemDiv);
      });
    }

    totalTexto.textContent = `Total: $${totalPrecio.toFixed(2)}`;

    // Si el panel estaba abierto, devolverle el foco para que no se cierre
    if (panelAbierto && carritoDiv) {
      carritoDiv.focus();
    }
  }

  renderizarCheckoutSummary(totalPrecio);
}

// ─────────────────────────────────────────────
// FUNCIÓN: renderizarCheckoutSummary(totalPrecio)
// Construye el resumen del pedido que aparece en la página de checkout.
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// FUNCIÓN: mostrarNotificacion(mensaje)
// Muestra un aviso temporal tipo toast para informar acciones del carrito.
// ─────────────────────────────────────────────
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
