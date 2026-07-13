// ─────────────────────────────────────────────
// BASE DE DATOS SIMULADA
// Usamos const porque este arreglo nunca se reasigna.
// Cada elemento es un objeto con las propiedades del producto.
// ─────────────────────────────────────────────
// En lugar de un arreglo estático, ahora guardaremos los productos que vengan de Supabase.
let listadoProductos = [];

// ─────────────────────────────────────────────
// FUNCIÓN: obtenerProductosDeSupabase()
// Consulta todos los productos, los guarda en memoria y devuelve el resultado.
// ─────────────────────────────────────────────
async function obtenerProductosDeSupabase() {
  try {
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/productos?select=*`, {
      headers: SUPABASE_HEADERS
    });
    
    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de Supabase");
    }
    
    const datos = await respuesta.json();
    listadoProductos = datos; // Guardamos en memoria para los filtros
    return datos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// FUNCIÓN: crearTarjetaProducto(producto)
// Recibe un objeto producto y devuelve un <article> listo para insertar en el DOM.
// Separar esta lógica en su propia función la hace reutilizable y fácil de leer.
// ─────────────────────────────────────────────
function crearTarjetaProducto(producto) {
  // Validación básica: si el producto no tiene nombre o precio, no lo mostramos.
  // Usamos === (comparación estricta) para no tener sorpresas con tipos de datos.
  if (!producto.nombre || producto.precio === undefined) {
    console.warn("Producto inválido, se omite:", producto);
    return null;
  }

  // Creamos el contenedor principal de la tarjeta
  const article = document.createElement("article");
  article.className = "tarjeta";

  // ── Imagen ──
  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.style.objectFit = "cover";
  // Plan B: si la imagen falla, mostramos un placeholder
  img.onerror = function () {
    this.src = "https://placehold.co/300x200?text=Sin+Imagen";
  };

  // ── Título ──
  const h3 = document.createElement("h3");
  h3.textContent = producto.nombre;

  // ── Precio ──
  // toFixed(2) garantiza que siempre se muestren dos decimales: 10 → "10.00"
  // Template literal (backticks) para armar el texto con el símbolo $ incluido
  const pPrecio = document.createElement("p");
  pPrecio.className = "precio";
  pPrecio.textContent = `$${producto.precio.toFixed(2)}`;

  // ── Calificación (estrellas) ──
  // Supabase no tiene el campo cuotas o calificacion por ahora, los simulamos si no existen
  const cuotasTexto = producto.cuotas || "3 cuotas sin interés";
  const calificacionTexto = producto.calificacion || "★★★★☆";
  
  // ── Cuotas ──
  const pCuotas = document.createElement("p");
  pCuotas.className = "cuotas";
  pCuotas.textContent = cuotasTexto;
  pCuotas.style.fontSize = "0.85rem";
  pCuotas.style.fontWeight = "bold";
  pCuotas.style.color = "var(--color-primario)";
  
  // ── Descripción ──
  const pDesc = document.createElement("p");
  pDesc.textContent = producto.descripcion;

  // ── Categoría ──
  const pCat = document.createElement("p");
  pCat.className = "categoria";
  const boldTag = document.createElement("strong");
  boldTag.textContent = "Categoría: ";
  pCat.appendChild(boldTag);
  pCat.appendChild(document.createTextNode(producto.categoria));

  const divRating = document.createElement("div");
  divRating.className = "rating";
  divRating.setAttribute("aria-label", `Calificación: ${calificacionTexto}`);
  divRating.textContent = calificacionTexto;

  // ── Botón "Ver más" ──
  const aVerMas = document.createElement("a");
  aVerMas.href = "detalle-producto.html?id=" + producto.id;
  aVerMas.className = "btn";
  aVerMas.textContent = "Ver más";

  // ── Stock ──
  const stockActual = producto.stock !== undefined ? producto.stock : 10;
  const pStock = document.createElement("p");
  pStock.id = `stock-${producto.id}`;
  pStock.style.fontSize = "0.8rem";
  pStock.style.color = stockActual <= 3 ? "#ef4444" : "var(--color-texto-suave)";
  pStock.style.marginBottom = "0.5rem";
  pStock.textContent = stockActual > 0 ? `Stock disponible: ${stockActual}` : "Sin stock";

  // ── Ensamblado final ──
  // appendChild agrega cada pieza dentro del article en el orden correcto
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(pPrecio);
  article.appendChild(pCuotas);
  article.appendChild(pDesc);
  article.appendChild(pCat);
  article.appendChild(divRating);
  article.appendChild(pStock);

  // ── Contenedor de Botones ──
  const divBotones = document.createElement("div");
  divBotones.style.display = "flex";
  divBotones.style.gap = "10px";
  divBotones.style.marginTop = "10px";

  aVerMas.style.flex = "1";

  const btnCarrito = document.createElement("button");
  btnCarrito.id = `btn-carrito-${producto.id}`;
  btnCarrito.className = "btn btn-comprar";
  btnCarrito.textContent = stockActual > 0 ? "🛒" : "Agotado";
  btnCarrito.title = "Añadir al carrito";
  btnCarrito.style.padding = "0.5rem 1rem";
  btnCarrito.style.flex = "0";
  if (stockActual <= 0) {
    btnCarrito.disabled = true;
    btnCarrito.style.opacity = "0.5";
    btnCarrito.style.cursor = "not-allowed";
  }
  btnCarrito.addEventListener("click", () => {
    if (window.agregarAlCarrito) {
      window.agregarAlCarrito(producto);
    }
  });

  divBotones.appendChild(aVerMas);
  divBotones.appendChild(btnCarrito);
  
  article.appendChild(divBotones);

  return article;
}

// ─────────────────────────────────────────────
// FUNCIÓN: cargarProductos()
// Busca el contenedor en el HTML y renderiza todas las tarjetas.
// Usamos forEach en lugar del for clásico: es más moderno y legible.
// ─────────────────────────────────────────────
function cargarProductos(productosAMostrar = listadoProductos) {
  const contenedor = document.querySelector("#productos-container");

  // Verificamos que el contenedor exista antes de operar sobre él
  if (!contenedor) {
    return;
  }

  // Limpiamos el contenedor por si ya tenía contenido previo
  contenedor.innerHTML = "";

  // forEach recorre cada producto del arreglo y ejecuta la función para cada uno
  productosAMostrar.forEach(function (producto) {
    const tarjeta = crearTarjetaProducto(producto);

    // Solo insertamos la tarjeta si la función devolvió algo válido (no null)
    if (tarjeta !== null) {
      contenedor.appendChild(tarjeta);
    }
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN: calcularTotal(productos)
// Recibe un arreglo de productos y devuelve la suma de todos los precios.
// Ejemplo de función reutilizable con lógica separada.
// ─────────────────────────────────────────────
function calcularTotal(productos) {
  let total = 0;
  productos.forEach(function (producto) {
    total += producto.precio;
  });
  // toFixed(2) para mostrar siempre dos decimales en el resultado
  return total.toFixed(2);
}

// ─────────────────────────────────────────────
// FUNCIÓN: filtrarPorCategoria(categoria)
// Devuelve un nuevo arreglo solo con los productos de esa categoría.
// Usa comparación estricta === para no mezclar tipos.
// ─────────────────────────────────────────────
function filtrarPorCategoria(categoria) {
  const resultado = [];
  listadoProductos.forEach(function (producto) {
    if (producto.categoria === categoria) {
      resultado.push(producto);
    }
  });
  return resultado;
}

// ─────────────────────────────────────────────
// FUNCIÓN: cargarDetalleProducto()
// Lee el ID de la URL y muestra los detalles del producto.
// ─────────────────────────────────────────────
function cargarDetalleProducto() {
  const contenedor = document.getElementById("detalle-producto-container");
  if (!contenedor) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId) {
    contenedor.innerHTML = "<p>Producto no especificado.</p>";
    return;
  }

  // Ahora buscamos en la base de datos de Supabase
  fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${productId}&select=*`, {
    headers: SUPABASE_HEADERS
  })
  .then(respuesta => respuesta.json())
  .then(productos => {
    const producto = productos[0];
    
    if (!producto) {
      contenedor.innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

    const cuotasTexto = producto.cuotas || "3 cuotas sin interés";
    const calificacionTexto = producto.calificacion || "★★★★☆";

    document.getElementById("detalle-img").src = producto.imagen || "https://placehold.co/300x200?text=Sin+Imagen";
    document.getElementById("detalle-img").alt = producto.nombre;
    document.getElementById("detalle-nombre").textContent = producto.nombre;
    document.getElementById("detalle-precio").textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById("detalle-cuotas").textContent = cuotasTexto;
    document.getElementById("detalle-categoria").textContent = producto.categoria;
    document.getElementById("detalle-rating").textContent = calificacionTexto;
    document.getElementById("detalle-descripcion").textContent = producto.descripcion;
    document.title = producto.nombre + " - Tienda App Móvil Premium";
    
    // Conectamos el botón de agregar al carrito
    const btnAddCart = document.getElementById("btn-add-cart-detalle");
    if (btnAddCart) {
      btnAddCart.onclick = function() {
        if (window.agregarAlCarrito) {
          window.agregarAlCarrito(producto);
        }
      };
    }
    
    // ── Cargar Comentarios ──
    cargarComentariosProducto(productId);
  })
  .catch(error => {
    console.error("Error al obtener detalle del producto:", error);
    contenedor.innerHTML = "<p>Ocurrió un error al cargar el producto.</p>";
  });
}

// ─────────────────────────────────────────────
// FUNCIÓN: cargarComentariosProducto(productId)
// Obtiene las reseñas de un producto y las transforma en tarjetas dentro del DOM.
// ─────────────────────────────────────────────
function cargarComentariosProducto(productId) {
  fetch(`${SUPABASE_URL}/rest/v1/comentarios?producto_id=eq.${productId}&select=*`, {
    headers: SUPABASE_HEADERS
  })
  .then(res => res.json())
  .then(comentarios => {
    const comentariosContainer = document.getElementById("comentarios-container");
    const comentariosLista = document.getElementById("comentarios-lista");
    
    if (!comentariosContainer || !comentariosLista) return;
    
    comentariosContainer.style.display = "block"; // Mostrar sección
    
    if (comentarios.length === 0) {
      comentariosLista.innerHTML = "<p style='color: #64748b;'>Aún no hay reseñas para este producto.</p>";
      return;
    }
    
    comentariosLista.innerHTML = "";
    
    comentarios.forEach(comentario => {
      const card = document.createElement("div");
      card.className = "comentario-card";
      
      const nombreUsuario = comentario.nombre_usuario || "Anónimo";
      const inicial = nombreUsuario.charAt(0).toUpperCase();
      const fechaObj = comentario.created_at ? new Date(comentario.created_at) : new Date();
      const fecha = fechaObj.toLocaleDateString("es-ES", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Dibujar estrellas
      const maxEstrellas = 5;
      const puntos = comentario.puntuacion || 5;
      let estrellasHtml = "";
      for (let i = 1; i <= maxEstrellas; i++) {
        estrellasHtml += i <= puntos ? "★" : "☆";
      }
      
      card.innerHTML = `
        <div class="comentario-header">
          <div class="comentario-usuario">
            <div class="avatar-placeholder">${inicial}</div>
            ${nombreUsuario}
          </div>
          <div class="comentario-fecha">${fecha}</div>
        </div>
        <div class="comentario-estrellas">${estrellasHtml}</div>
        <div class="comentario-texto">${comentario.comentario}</div>
      `;
      
      comentariosLista.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al cargar comentarios:", err);
    const comentariosLista = document.getElementById("comentarios-lista");
    if (comentariosLista) {
      comentariosLista.innerHTML = "<p>Error al cargar las reseñas.</p>";
    }
  });
}

// ─────────────────────────────────────────────
// EVENTO: DOMContentLoaded
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async function () {
  
  // Si existe el contenedor de productos, cargamos los datos de Supabase
  if (document.querySelector("#productos-container")) {
    const productos = await obtenerProductosDeSupabase();
    cargarProductos(productos);
  }

  cargarDetalleProducto();

  // ─────────────────────────────────────────────
  // Lógica de Filtro por Categorías
  // ─────────────────────────────────────────────
  const categoriasBtns = document.querySelectorAll('#lista-categorias li');
  
  if (categoriasBtns.length > 0) {
    categoriasBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Quitar la clase activa de todos
        categoriasBtns.forEach(b => b.classList.remove('activa'));
        // Agregar la clase activa al clickeado
        this.classList.add('activa');
        
        const categoriaSeleccionada = this.getAttribute('data-categoria');
        
        if (categoriaSeleccionada === 'Todas') {
          cargarProductos(listadoProductos);
        } else {
          const productosFiltrados = filtrarPorCategoria(categoriaSeleccionada);
          cargarProductos(productosFiltrados);
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // Lógica del carrito: desplegar al hacer click
  // ─────────────────────────────────────────────
  const carritoBtn = document.querySelector('.carrito-btn');
  const carrito = document.querySelector('.carrito');

  if (carritoBtn && carrito) {
    carritoBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      carrito.classList.toggle('active');
    });

    // Cerrar el carrito si se hace click fuera de él
    document.addEventListener('click', function (e) {
      if (!carrito.contains(e.target)) {
        carrito.classList.remove('active');
      }
    });
  }

  // ─────────────────────────────────────────────
  // Lógica de Búsqueda en Vivo
  // ─────────────────────────────────────────────
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  // FUNCIÓN: realizarBusqueda()
  // Filtra productos por nombre, categoría o descripción mientras el usuario escribe.
  function realizarBusqueda() {
    const texto = searchInput.value.toLowerCase();
    const productosFiltrados = listadoProductos.filter(p => 
      p.nombre.toLowerCase().includes(texto) || 
      p.categoria.toLowerCase().includes(texto) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(texto))
    );
    
    cargarProductos(productosFiltrados);
    
    // Opcional: limpiar los filtros de categorías si se está buscando algo específico
    if (texto !== '') {
      categoriasBtns.forEach(b => b.classList.remove('activa'));
    }
  }

  if (searchInput && searchButton) {
    // Buscar al escribir (Live Search)
    searchInput.addEventListener('input', realizarBusqueda);
    // Buscar al hacer clic en el botón
    searchButton.addEventListener('click', realizarBusqueda);
  }
});
