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
  formulario.addEventListener("submit", async function (evento) {

    // Prevenimos el comportamiento por defecto: que la página se recargue
    evento.preventDefault();

    // Leemos los valores de cada campo usando su ID
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const descripcion = document.querySelector("#descripcion").value;
    const categoria = document.querySelector("#categoria").value;
    const stock = document.querySelector("#stock").value;

    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
      descripcion: descripcion,
      categoria: categoria,
      stock: parseInt(stock) || 0
      // Nota: Supabase generará el 'id' y el 'created_at' automáticamente
    };

    if (!validarProducto(nuevoProducto)) {
      return;
    }

    // Cambiamos el texto del botón para indicar que estamos cargando
    const btnSubmit = formulario.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = "Guardando...";
    btnSubmit.disabled = true;

    try {
      // Enviamos el producto a Supabase
      const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/productos`, {
        method: 'POST',
        headers: SUPABASE_HEADERS,
        body: JSON.stringify(nuevoProducto)
      });

      if (!respuesta.ok) {
        // Capturamos el error real que manda Supabase
        const errorData = await respuesta.json();
        console.error("Supabase rechazó la petición:", errorData);
        throw new Error(errorData.message || "Error desconocido de Supabase");
      }

      const datosGuardados = await respuesta.json();
      console.log("Producto guardado exitosamente:", datosGuardados);

      alert(`¡Éxito! El producto "${nuevoProducto.nombre}" fue registrado correctamente en la base de datos.`);
      formulario.reset();
      
    } catch (error) {
      console.error("Hubo un problema:", error);
      alert(`No se pudo guardar el producto.\nMotivo: ${error.message}\n(Revisa si ejecutaste el SQL en Supabase para crear las tablas y políticas).`);
    } finally {
      // Restauramos el botón
      btnSubmit.textContent = textoOriginal;
      btnSubmit.disabled = false;
    }
  });

});
