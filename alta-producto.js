// ─────────────────────────────────────────────
// EVENTO: DOMContentLoaded
// Esperamos que el HTML esté 100% cargado antes de buscar elementos.
// Sin esto, document.querySelector devolvería null y el código fallaría.
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos el formulario por su ID único
  const formulario = document.querySelector("#form-alta-producto");

  // Validamos que el formulario exista en esta página antes de operar
  if (!formulario) {
    console.error("Error: No se encontró #form-alta-producto en el HTML.");
    return;
  }

  // ─────────────────────────────────────────────
  // FUNCIÓN: validarProducto(datos)
  // Recibe el objeto con los datos del formulario y devuelve true si son válidos.
  // Separar la validación en su propia función la hace reutilizable y testeable.
  // ─────────────────────────────────────────────
  function validarProducto(datos) {
    // trim() elimina espacios en blanco al inicio y al final del texto
    if (datos.nombre.trim() === "") {
      alert("El nombre del producto no puede estar vacío.");
      return false;
    }

    // Comparación estricta: el precio debe ser un número mayor a cero
    if (datos.precio <= 0 || isNaN(datos.precio)) {
      alert("El precio debe ser un número mayor a cero.");
      return false;
    }

    // El stock no puede ser negativo
    if (datos.stock < 0) {
      alert("El stock no puede ser un número negativo.");
      return false;
    }

    // Si pasó todas las validaciones, devolvemos true
    return true;
  }

  // ─────────────────────────────────────────────
  // EVENTO: submit del formulario
  // Se dispara cuando el usuario hace clic en "Registrar Producto"
  // ─────────────────────────────────────────────
  formulario.addEventListener("submit", function (evento) {

    // Prevenimos el comportamiento por defecto: que la página se recargue
    // y se pierdan todos los datos que el usuario escribió
    evento.preventDefault();

    // Leemos los valores de cada campo usando su ID
    // .value siempre devuelve un string (texto), por eso convertimos precio y stock
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const descripcion = document.querySelector("#descripcion").value;
    const categoria = document.querySelector("#categoria").value;
    const stock = document.querySelector("#stock").value;

    // Armamos un objeto con los datos ya convertidos al tipo correcto
    // parseFloat convierte "9.99" (string) → 9.99 (número decimal)
    // parseInt convierte "100" (string) → 100 (número entero)
    // El || 0 es un operador lógico: si stock está vacío (falsy), usa 0 como valor por defecto
    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
      descripcion: descripcion,
      categoria: categoria,
      stock: parseInt(stock) || 0
    };

    // Validamos antes de "guardar". Si la validación falla, cortamos la ejecución.
    if (!validarProducto(nuevoProducto)) {
      return;
    }

    // Simulamos el guardado mostrando el objeto en consola
    console.log("Producto registrado:", nuevoProducto);

    // Template literal: usamos backticks (`) para armar el mensaje con variables adentro
    // Esto es más limpio que concatenar con el operador +
    alert(`¡Éxito! El producto "${nuevoProducto.nombre}" fue registrado por $${nuevoProducto.precio.toFixed(2)}.`);

    // Limpiamos el formulario automáticamente para poder cargar otro producto
    formulario.reset();
  });

});
