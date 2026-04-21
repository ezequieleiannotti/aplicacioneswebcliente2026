// Esperamos que el DOM cargue completo
document.addEventListener("DOMContentLoaded", function() {
  
  // Seleccionamos el formulario a través del ID que le pusimos en el HTML
  const formulario = document.querySelector("#form-alta-producto");

  // Validamos que el formulario exista en la página
  if(formulario) {
    
    // Escuchamos el evento 'submit' (cuando el botón "Registrar Producto" es presionado)
    formulario.addEventListener("submit", function(evento) {
      
      // 1. PREVENIMOS el comportamiento por defecto (que la página se recargue y todo se borre)
      evento.preventDefault();
      
      // 2. Extraemos los valores que el usuario escribió usando el 'id' de los inputs
      const nombre = document.querySelector("#nombre").value;
      const precio = document.querySelector("#precio").value;
      const descripcion = document.querySelector("#descripcion").value;
      const categoria = document.querySelector("#categoria").value;
      const stock = document.querySelector("#stock").value;

      // 3. Armamos un "objeto" con esta información, simulando crear el producto
      const nuevoProducto = {
        nombre: nombre,
        precio: parseFloat(precio),
        descripcion: descripcion,
        categoria: categoria,
        stock: parseInt(stock) || 0
      };

      // 4. Simulamos guardarlo o conectarlo mostrando un cartel amigable al usuario
      console.log("Producto a guardar:", nuevoProducto);
      alert(`¡Éxito! El producto '${nuevoProducto.nombre}' ha sido registrado correctamente.`);

      // 5. Finalmente, limpiamos las cajas de texto automáticamente para cargar otro producto
      formulario.reset();
    });
    
  }
});
