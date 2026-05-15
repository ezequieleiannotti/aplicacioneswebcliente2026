// ─────────────────────────────────────────────
// BASE DE DATOS SIMULADA
// Usamos const porque este arreglo nunca se reasigna.
// Cada elemento es un objeto con las propiedades del producto.
// ─────────────────────────────────────────────
const listadoProductos = [
  {
    id: 1,
    nombre: "App de Ejemplo 1",
    precio: 10.00,
    descripcion: "Sumérgete en un mundo de aventuras épicas con esta innovadora aplicación de juegos. Disfruta de gráficos en alta definición, múltiples niveles desafiantes y un modo multijugador para competir con tus amigos en tiempo real.",
    categoria: "Juegos",
    calificacion: "★★★★☆",
    imagen: "https://cdn.pixabay.com/photo/2012/11/30/06/00/app-68002_1280.jpg",
    cuotas: "3 cuotas sin interés"
  },
  {
    id: 2,
    nombre: "App de Ejemplo 2",
    precio: 15.00,
    descripcion: "Optimiza tu tiempo y organiza tus tareas diarias como un profesional. Esta aplicación te permite gestionar proyectos, establecer recordatorios inteligentes y colaborar con tu equipo en la nube.",
    categoria: "Productividad",
    calificacion: "★★★★☆",
    imagen: "https://cdn.pixabay.com/photo/2012/11/30/06/00/app-68002_1280.jpg",
    cuotas: "6 cuotas fijas"
  },
  {
    id: 3,
    nombre: "App de Ejemplo 3",
    precio: 20.00,
    descripcion: "Aprende nuevas habilidades desde la palma de tu mano. Esta plataforma educativa ofrece cursos interactivos, cuestionarios en vivo y seguimiento de progreso personalizado para tu crecimiento.",
    categoria: "Educación",
    calificacion: "★★★★☆",
    imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=200&auto=format&fit=crop",
    cuotas: "3 cuotas sin interés"
  },
  {
    id: 4,
    nombre: "App de Ejemplo 4",
    precio: 25.00,
    descripcion: "Conecta con personas que comparten tus mismos intereses. Crea tu perfil, comparte momentos inolvidables y únete a comunidades exclusivas en un entorno seguro y amigable.",
    categoria: "Social",
    calificacion: "★★★★☆",
    imagen: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&h=200&auto=format&fit=crop",
    cuotas: "1 pago"
  }
];

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

  // ── Cuotas ──
  const pCuotas = document.createElement("p");
  pCuotas.className = "cuotas";
  pCuotas.textContent = producto.cuotas;
  pCuotas.style.fontSize = "0.85rem";
  pCuotas.style.fontWeight = "bold";
  pCuotas.style.color = "var(--color-primario)";

  // ── Descripción ──
  const pDesc = document.createElement("p");
  pDesc.textContent = producto.descripcion;

  // ── Categoría ──
  // Usamos createElement + createTextNode en lugar de innerHTML
  // para evitar inyección de código malicioso (seguridad).
  const pCat = document.createElement("p");
  pCat.className = "categoria";
  const boldTag = document.createElement("strong");
  boldTag.textContent = "Categoría: ";
  pCat.appendChild(boldTag);
  pCat.appendChild(document.createTextNode(producto.categoria));

  // ── Calificación (estrellas) ──
  const divRating = document.createElement("div");
  divRating.className = "rating";
  divRating.setAttribute("aria-label", `Calificación: ${producto.calificacion}`);
  divRating.textContent = producto.calificacion;

  // ── Botón "Ver más" ──
  const aVerMas = document.createElement("a");
  aVerMas.href = "detalle-producto.html?id=" + producto.id;
  aVerMas.className = "btn";
  aVerMas.textContent = "Ver más";

  // ── Ensamblado final ──
  // appendChild agrega cada pieza dentro del article en el orden correcto
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(pPrecio);
  article.appendChild(pCuotas);
  article.appendChild(pDesc);
  article.appendChild(pCat);
  article.appendChild(divRating);
  article.appendChild(aVerMas);

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

  const producto = listadoProductos.find(p => p.id === productId);

  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  document.getElementById("detalle-img").src = producto.imagen;
  document.getElementById("detalle-img").alt = producto.nombre;
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  document.getElementById("detalle-precio").textContent = `$${producto.precio.toFixed(2)}`;
  document.getElementById("detalle-cuotas").textContent = producto.cuotas;
  document.getElementById("detalle-categoria").textContent = producto.categoria;
  document.getElementById("detalle-rating").textContent = producto.calificacion;
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;
  document.title = producto.nombre + " - Tienda App Móvil Premium";
}

// ─────────────────────────────────────────────
// EVENTO: DOMContentLoaded
// Concepto clave: el navegador ejecuta este bloque SOLO cuando terminó
// de leer y construir todo el HTML. Sin esto, el JS intentaría buscar
// elementos que todavía no existen y fallaría silenciosamente.
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
  cargarDetalleProducto();

  // Mostramos en consola el total del catálogo como ejemplo de uso
  const total = calcularTotal(listadoProductos);
  console.log(`Total del catálogo: $${total}`);

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
});
