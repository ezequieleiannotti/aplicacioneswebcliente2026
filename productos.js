// Arreglo de objetos simulando una pequeña base de datos de productos
const listadoProductos = [
  {
    id: 1,
    nombre: "App de Ejemplo 1",
    precio: 10.00,
    descripcion: "Descripción breve de la aplicación.",
    categoria: "Juegos",
    calificacion: "★★★★☆",
    imagen: "https://cdn.pixabay.com/photo/2012/11/30/06/00/app-68002_1280.jpg",
    cuotas: "3 cuotas sin interés"
  },
  {
    id: 2,
    nombre: "App de Ejemplo 2",
    precio: 15.00,
    descripcion: "Descripción breve de la aplicación.",
    categoria: "Productividad",
    calificacion: "★★★★☆",
    imagen: "https://cdn.pixabay.com/photo/2012/11/30/06/00/app-68002_1280.jpg",
    cuotas: "6 cuotas fijas"
  },
  {
    id: 3,
    nombre: "App de Ejemplo 3",
    precio: 20.00,
    descripcion: "Descripción breve de la aplicación.",
    categoria: "Educación",
    calificacion: "★★★★☆",
    imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=200&auto=format&fit=crop",
    cuotas: "3 cuotas sin interés"
  },
  {
    id: 4,
    nombre: "App de Ejemplo 4",
    precio: 25.00,
    descripcion: "Descripción breve de la aplicación.",
    categoria: "Social",
    calificacion: "★★★★☆",
    imagen: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&h=200&auto=format&fit=crop",
    cuotas: "1 pago"
  }
];

// Función para crear cada tarjeta individual a partir de un producto
function crearTarjetaProducto(producto) {
  // 1. Crear el contenedor principal de la tarjeta
  const article = document.createElement("article");
  article.className = "tarjeta";

  // 2. Crear y configurar la imagen (el tamaño se maneja por CSS)
  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.style.objectFit = "cover";
  
  // Agregar fallback de imagen
  img.onerror = function() {
    this.src = "https://placehold.co/300x200?text=Sin+Imagen"; 
  };

  // 3. Crear el título
  const h3 = document.createElement("h3");
  h3.textContent = producto.nombre;

  // 4. Crear el precio
  const pPrecio = document.createElement("p");
  pPrecio.className = "precio";
  pPrecio.textContent = `$${producto.precio.toFixed(2)}`;

  // 5. Crear información adicional de cuotas
  const pCuotas = document.createElement("p");
  pCuotas.className = "cuotas";
  pCuotas.textContent = producto.cuotas;
  pCuotas.style.fontSize = "0.85rem";
  pCuotas.style.fontWeight = "bold";
  pCuotas.style.color = "var(--color-primario)"; 

  // 6. Crear descripción
  const pDesc = document.createElement("p");
  pDesc.textContent = producto.descripcion;

  // 7. Crear el contenedor de categoría (usando textContent para seguridad)
  const pCat = document.createElement("p");
  pCat.className = "categoria";
  
  const boldTag = document.createElement("strong");
  boldTag.textContent = "Categoría: ";
  
  pCat.appendChild(boldTag);
  pCat.appendChild(document.createTextNode(producto.categoria));

  // 8. Crear calificación visual (estrellas)
  const divRating = document.createElement("div");
  divRating.className = "rating";
  divRating.setAttribute("aria-label", "Calificación");
  divRating.textContent = producto.calificacion;

  // 9. Crear el botón de acción
  const aVerMas = document.createElement("a");
  aVerMas.href = "catalogo.html";
  aVerMas.className = "btn";
  aVerMas.textContent = "Ver más";

  // 10. Ensamblar todo en el orden correcto
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

// Función principal que renderiza los productos en el DOM
function cargarProductos() {
  // Buscamos el contenedor donde irán nuestros artículos
  const contenedorProductos = document.querySelector("#productos-container");
  
  if (!contenedorProductos) {
    console.error("Error: No se encontró el #productos-container en el HTML.");
    return;
  }

  // Limpiamos el contenedor (útil por si hay información vieja o queremos recargar)
  contenedorProductos.innerHTML = "";

  // Iteramos sobre todos los productos para construir y alojar sus tarjetas
  for (let i = 0; i < listadoProductos.length; i++) {
    const productoActual = listadoProductos[i];
    
    // Convertimos cada objeto de información en un bloque HTML
    const tarjetaResultante = crearTarjetaProducto(productoActual);
    
    // Y la pegamos adentro de ".productos-grid"
    contenedorProductos.appendChild(tarjetaResultante);
  }
}

// Event listener crucial para no ejecutar código antes de que exista el HTML
document.addEventListener("DOMContentLoaded", function() {
  // Cuando el navegador termina de analizar todo el HTML, ejecutamos nuestra función
  cargarProductos();
});
