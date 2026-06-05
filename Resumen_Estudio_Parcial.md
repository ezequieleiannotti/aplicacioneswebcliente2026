# Guia de Estudio para el Parcial: Aplicacion Web

Este documento explica linea por linea los conceptos de HTML5, CSS3 y JavaScript aplicados en tu proyecto. Disenado para que puedas defender cada decision de codigo frente a cualquier pregunta del parcial.

---

## 1. Conceptos de HTML5 Utilizados

El HTML (HyperText Markup Language) es el esqueleto del proyecto. Usamos un enfoque semantico: las etiquetas describen su propio contenido en lugar de usar puros div sin significado.

### Etiquetas Semanticas Base

- `<!DOCTYPE html>`: Obligatorio en la primera linea. Le dice al navegador que usamos HTML5.
- `<header>`: Encabezado de la pagina. Contiene el titulo y la barra de navegacion.
- `<nav>`: Agrupa los enlaces de navegacion principal (Inicio, Catalogo, Login).
- `<main>`: Contenedor del contenido principal y exclusivo de cada pagina.
- `<section>` / `<article>`: section divide estructuralmente el sitio (Categorias, Productos). article se usa para cada tarjeta porque su contenido tiene sentido por si mismo: si sacas una tarjeta y la pones en otro lado, sigue siendo un producto completo.
- `<footer>`: Pie de pagina con copyright y datos de contacto.

### Formularios

En formulario.html y alta-producto.html:

- `<form method="POST">`: Agrupa los elementos interactivos. POST envia los datos ocultos en el cuerpo de la peticion (ideal para datos sensibles o que modifican algo en el servidor).
- `<input>` / `<textarea>` / `<select>`: Elementos donde el usuario escribe o elige.
- `<label for="id">` + `<input id="id">`: Enlaza la etiqueta con su campo. Si el usuario hace clic en el texto del label, el cursor salta automaticamente al input. Fundamental para accesibilidad (lectores de pantalla).

### Multimedia

- `<img src="..." alt="...">`: Inserta imagenes. src es la ruta, alt es el texto alternativo que ven los lectores de pantalla o cuando la imagen falla.
- `<svg>`: Scalable Vector Graphics. Son coordenadas matematicas dibujadas por el navegador. A diferencia de una imagen JPG, nunca pierden calidad al escalar. Lo usamos para el icono del carrito.

---

## 2. Conceptos de CSS3 Utilizados (estilos.css - linea por linea)

### Variables CSS (:root)

```css
:root {
    --color-primario: #2563eb;
    --color-secundario: #1e40af;
    --color-fondo: #f8fafc;
    --color-texto: #1e293b;
    --color-borde: #e2e8f0;
    --color-blanco: #ffffff;
    --tamano-header: 60px;
    --tamano-footer: 80px;
}
```

- `:root`: Es el selector del elemento mas alto del documento (equivale a html). Todo lo que se define aqui es global.
- `--nombre-variable: valor`: Sintaxis para declarar una variable CSS. El doble guion es obligatorio.
- `var(--color-primario)`: Asi se usa la variable en cualquier otra parte del CSS. Si cambias el valor en :root, cambia en todo el sitio automaticamente. Muy util para mantener consistencia de colores.

### Reset Universal

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

- `*`: Selector universal. Aplica a TODOS los elementos de la pagina.
- `margin: 0; padding: 0;`: Elimina los espacios por defecto que los navegadores agregan a los elementos. Sin esto, cada navegador mostraria la pagina diferente.
- `box-sizing: border-box`: Cambia como se calcula el tamano de los elementos. Con este valor, el padding y el borde se incluyen DENTRO del ancho declarado. Sin el, si dices width: 200px y agregas padding: 20px, el elemento termina midiendo 240px. Con border-box siempre mide exactamente lo que declaras.

### body

```css
body {
    font-family: Arial, sans-serif;
    background-color: var(--color-fondo);
    color: var(--color-texto);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
```

- `font-family: Arial, sans-serif`: Define la tipografia. El segundo valor (sans-serif) es el fallback: si Arial no esta disponible, el navegador usa cualquier fuente sin serifa.
- `min-height: 100vh`: vh = viewport height (altura de la ventana). 100vh significa "al menos tan alto como la pantalla completa". Evita que el footer quede flotando en el medio si hay poco contenido.
- `display: flex; flex-direction: column`: Convierte el body en un contenedor flexible vertical. Esto permite que el footer siempre quede pegado abajo usando flex: 1 en el main.

### header

```css
header {
    background-color: var(--color-primario);
    color: var(--color-blanco);
    padding: 1rem;
    height: var(--tamano-header);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

- `padding: 1rem`: Espacio interior de 1rem (16px por defecto) en los cuatro lados.
- `height: var(--tamano-header)`: Usa la variable definida en :root. Si queres cambiar la altura del header, solo cambias la variable.
- `display: flex`: Activa Flexbox en el header.
- `align-items: center`: Alinea los hijos (titulo y nav) verticalmente al centro.
- `justify-content: space-between`: Empuja el titulo a la izquierda y la navegacion a la derecha, con todo el espacio disponible entre ellos.

### Carrito - Boton

```css
.carrito-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: #fff;
    padding: 0.5rem 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}
```

- `rgba(255, 255, 255, 0.1)`: Color blanco con 10% de opacidad. El cuarto valor (0.1) es el canal alfa (transparencia). 0 = invisible, 1 = solido.
- `border-radius: 8px`: Redondea las esquinas del boton 8 pixeles. Si fuera 50% o 999px, seria un circulo/capsula.
- `display: inline-flex`: Como flex pero el contenedor se comporta como un elemento en linea (no ocupa todo el ancho). Permite alinear el icono SVG y el badge lado a lado.
- `gap: 0.5rem`: Espacio entre el icono y el badge.
- `cursor: pointer`: Cambia el cursor del mouse a una manito cuando pasa por encima, indicando que es clickeable.
- `transition: all 0.3s ease`: Cualquier cambio de estilo (color, posicion, sombra) se animara suavemente durante 0.3 segundos con aceleracion ease (empieza rapido, termina lento).

### Badge (contador del carrito)

```css
.badge {
    background: #ef4444;
    color: #fff;
    border-radius: 999px;
    padding: 0.15rem 0.45rem;
    font-size: 0.75rem;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

- `border-radius: 999px`: Valor exageradamente grande para garantizar que siempre sea una capsula/circulo sin importar el tamano del contenido.
- `box-shadow: 0 2px 4px rgba(0,0,0,0.2)`: Sombra exterior. Los valores son: desplazamiento-X desplazamiento-Y difuminado color. Aqui: sin desplazamiento horizontal, 2px hacia abajo, 4px de difuminado, negro al 20%.

### Panel del carrito (dropdown)

```css
.carrito-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 12px);
    width: 360px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 50;
}
```

- `position: absolute`: El panel se posiciona relativo a su ancestro con position: relative (el .carrito). Flota por encima del resto del contenido sin empujar elementos.
- `right: 0`: Alinea el borde derecho del panel con el borde derecho del .carrito.
- `top: calc(100% + 12px)`: calc() permite hacer calculos en CSS. 100% = la altura del boton padre, + 12px de separacion. El panel aparece justo debajo del boton.
- `opacity: 0`: Invisible pero ocupa espacio en el DOM.
- `visibility: hidden`: Ademas de invisible, no recibe eventos del mouse. Necesario junto con opacity para que no se pueda hacer clic en algo invisible.
- `transform: translateY(10px)`: Desplaza el panel 10px hacia abajo de su posicion normal (efecto de entrada).
- `cubic-bezier(0.16, 1, 0.3, 1)`: Curva de animacion personalizada. Produce un efecto de "resorte" (entra rapido y frena suavemente).
- `z-index: 50`: Controla el orden de apilamiento. Un valor mayor significa que se dibuja por encima de elementos con z-index menor.

### Mostrar el panel al hacer hover

```css
.carrito:hover .carrito-panel,
.carrito:focus-within .carrito-panel {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
```

- `.carrito:hover .carrito-panel`: Selector descendiente con pseudo-clase. Se lee: "el .carrito-panel que esta dentro de un .carrito que tiene el mouse encima".
- `:focus-within`: Se activa cuando cualquier elemento hijo del .carrito tiene el foco (por ejemplo, al navegar con Tab). Esto hace el carrito accesible sin mouse.
- `transform: translateY(0)`: Devuelve el panel a su posicion original. Combinado con la transition, crea la animacion de deslizamiento hacia arriba.

### CSS Grid (catalogo)

```css
.productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}
```

- `display: grid`: Activa el modo grilla en el contenedor.
- `repeat(auto-fill, minmax(280px, 1fr))`: La linea mas importante del CSS. Se lee: "repeti columnas automaticamente (auto-fill), donde cada columna mide como minimo 280px y como maximo 1fr (una fraccion del espacio disponible)". El navegador calcula solo cuantas columnas entran segun el ancho de la pantalla. Esto hace el diseno responsivo sin media queries.
- `gap: 2rem`: Espacio de 2rem entre todas las celdas de la grilla (tanto horizontal como vertical).

### Tarjetas

```css
.tarjeta {
    background-color: var(--color-blanco);
    border: 1px solid var(--color-borde);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
}

.tarjeta:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
    border-color: #cbd5e1;
}
```

- `border-radius: 16px`: Esquinas redondeadas mas pronunciadas que el boton (8px), dando un aspecto mas "suave" a las tarjetas.
- `display: flex; flex-direction: column`: Apila los elementos de la tarjeta verticalmente (imagen, titulo, precio, descripcion, boton).
- `transform: translateY(-4px)`: Al hacer hover, la tarjeta sube 4px. El signo negativo es hacia arriba en el eje Y.
- `box-shadow: 0 12px 30px rgba(0,0,0,0.08)`: Sombra grande y difuminada que aparece al hacer hover, reforzando el efecto de "elevacion".

### Hero Section

```css
.hero {
    background: linear-gradient(135deg, var(--color-primario) 0%, #3b82f6 100%);
    color: var(--color-blanco);
    padding: 5rem 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
}
```

- `linear-gradient(135deg, color1 0%, color2 100%)`: Degradado lineal. 135deg es el angulo (diagonal). El color va de color-primario al 0% hasta #3b82f6 al 100% del recorrido.
- `padding: 5rem 2rem`: Dos valores = vertical horizontal. 5rem arriba y abajo, 2rem a los lados.
- `text-align: center`: Centra todo el texto dentro del hero.

### Formularios - Estados interactivos

```css
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--color-primario);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
    background-color: var(--color-blanco);
}
```

- `:focus`: Pseudo-clase que se activa cuando el usuario esta escribiendo en ese campo (tiene el foco).
- `outline: none`: Elimina el borde azul/naranja que los navegadores agregan por defecto al hacer foco. Lo reemplazamos con nuestro propio estilo.
- `box-shadow: 0 0 0 4px rgba(...)`: Sombra sin desplazamiento ni difuminado, solo expansion de 4px. Crea un "halo" o resplandor alrededor del campo activo.

### Media Queries (Responsividad)

```css
@media (max-width: 768px) {
    header {
        flex-direction: column;
        height: auto;
        gap: 1rem;
    }
    nav ul {
        flex-direction: column;
        text-align: center;
    }
    .productos-grid {
        grid-template-columns: 1fr;
    }
}
```

- `@media (max-width: 768px)`: Bloque condicional. El CSS dentro solo se aplica si la pantalla mide 768px o menos (tipicamente tablets y celulares). En pantallas mas grandes, este bloque se ignora completamente.
- `flex-direction: column`: Cambia la direccion del flex de horizontal a vertical. El header que en desktop tenia titulo y nav lado a lado, en mobile los apila uno encima del otro.
- `height: auto`: Anula la altura fija del header para que se expanda segun su contenido en mobile.
- `grid-template-columns: 1fr`: Fuerza una sola columna en el catalogo para mobile.

---

## 3. JavaScript - productos.js (linea por linea)

### La base de datos simulada

```javascript
const listadoProductos = [
  { id: 1, nombre: "App de Ejemplo 1", precio: 10.00, ... },
  { id: 2, nombre: "App de Ejemplo 2", precio: 15.00, ... },
  ...
];
```

- `const`: Declaracion de variable que no se puede reasignar. Usamos const porque este arreglo siempre va a ser el mismo arreglo (aunque su contenido podria cambiar).
- `[...]`: Arreglo (Array). Una lista ordenada de elementos.
- `{...}`: Objeto. Cada producto es un objeto con propiedades clave: valor.
- Por que un arreglo de objetos: Centraliza la informacion. Si queres agregar un producto, solo agregas un objeto al arreglo. El resto del codigo se adapta solo.

### Funcion crearTarjetaProducto

```javascript
function crearTarjetaProducto(producto) {
  if (!producto.nombre || producto.precio === undefined) {
    console.warn("Producto invalido, se omite:", producto);
    return null;
  }
  ...
}
```

- `function nombre(parametro)`: Declaracion de funcion. Recibe un objeto producto y devuelve un elemento HTML.
- `!producto.nombre`: El operador ! niega el valor. Si nombre es vacio (""), null o undefined, la condicion es verdadera.
- `===`: Comparacion estricta. Compara valor Y tipo de dato. 0 === "0" es false. Siempre preferir === sobre ==.
- `console.warn(...)`: Muestra un aviso en la consola del navegador (amarillo). Util para depurar sin romper la ejecucion.
- `return null`: Corta la funcion y devuelve null. El codigo que llama a esta funcion debe verificar si recibio null antes de usarlo.

```javascript
const img = document.createElement("img");
img.src = producto.imagen;
img.alt = producto.nombre;
img.onerror = function () {
  this.src = "https://placehold.co/300x200?text=Sin+Imagen";
};
```

- `document.createElement("img")`: Crea un elemento HTML en memoria (todavia no esta en la pagina).
- `img.src = ...`: Asigna el atributo src al elemento creado.
- `img.onerror`: Evento que se dispara si la imagen no carga. `this` dentro de la funcion hace referencia al propio elemento img. Es el "Plan B" visual.

```javascript
const pPrecio = document.createElement("p");
pPrecio.textContent = `$${producto.precio.toFixed(2)}`;
```

- Template literal (backticks ` `): Permite insertar variables dentro de un string usando ${variable}. Mas limpio que concatenar con +.
- `toFixed(2)`: Metodo de los numeros. Convierte 10 en "10.00" (siempre dos decimales). Devuelve un string.

```javascript
const pCat = document.createElement("p");
const boldTag = document.createElement("strong");
boldTag.textContent = "Categoria: ";
pCat.appendChild(boldTag);
pCat.appendChild(document.createTextNode(producto.categoria));
```

- Por que no usamos innerHTML: Usar innerHTML con datos del usuario es un riesgo de seguridad (XSS - Cross Site Scripting). Si producto.categoria contuviera codigo HTML malicioso, se ejecutaria. Con textContent y createTextNode, el texto se trata siempre como texto plano, nunca como codigo.
- `appendChild(elemento)`: Inserta un elemento como ultimo hijo del contenedor.
- `document.createTextNode("texto")`: Crea un nodo de texto puro, sin etiquetas HTML.

### Funcion cargarProductos

```javascript
function cargarProductos() {
  const contenedor = document.querySelector("#productos-container");

  if (!contenedor) {
    console.error("Error: No se encontro #productos-container.");
    return;
  }

  contenedor.innerHTML = "";

  listadoProductos.forEach(function (producto) {
    const tarjeta = crearTarjetaProducto(producto);
    if (tarjeta !== null) {
      contenedor.appendChild(tarjeta);
    }
  });
}
```

- `document.querySelector("#productos-container")`: Busca el primer elemento con ese ID en el HTML. Devuelve null si no existe.
- `contenedor.innerHTML = ""`: Limpia el contenido del contenedor. Util si la funcion se llama varias veces (evita duplicados).
- `forEach(function(producto) {...})`: Recorre cada elemento del arreglo y ejecuta la funcion para cada uno. Es equivalente a un for pero mas expresivo y moderno.
- `tarjeta !== null`: Verificamos que la funcion crearTarjetaProducto devolvio algo valido antes de insertarlo.

### Funciones utilitarias

```javascript
function calcularTotal(productos) {
  let total = 0;
  productos.forEach(function (producto) {
    total += producto.precio;
  });
  return total.toFixed(2);
}
```

- `let total = 0`: Usamos let (no const) porque total va a cambiar su valor dentro del forEach.
- `total += producto.precio`: Equivale a total = total + producto.precio. Acumula la suma.
- Separar esta logica en su propia funcion la hace reutilizable: podes llamarla con cualquier arreglo de productos.

```javascript
function filtrarPorCategoria(categoria) {
  const resultado = [];
  listadoProductos.forEach(function (producto) {
    if (producto.categoria === categoria) {
      resultado.push(producto);
    }
  });
  return resultado;
}
```

- `const resultado = []`: Arreglo vacio donde acumularemos los productos que pasen el filtro.
- `=== categoria`: Comparacion estricta. Solo agrega el producto si la categoria coincide exactamente.
- `resultado.push(producto)`: Agrega el producto al final del arreglo resultado.

### DOMContentLoaded

```javascript
document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
  const total = calcularTotal(listadoProductos);
  console.log(`Total del catalogo: $${total}`);
});
```

- `document.addEventListener("DOMContentLoaded", funcion)`: Registra una funcion para que se ejecute cuando el navegador termino de leer y construir todo el HTML.
- Por que es critico: Si el script esta en el `<head>` o antes del HTML que necesita, querySelector devolveria null porque los elementos todavia no existen. DOMContentLoaded garantiza que el HTML esta listo.
- Template literal en console.log: Mismo concepto que antes, backticks para insertar la variable total en el mensaje.

---

## 4. JavaScript - alta-producto.js (linea por linea)

### Seleccion y validacion del formulario

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#form-alta-producto");

  if (!formulario) {
    console.error("Error: No se encontro #form-alta-producto.");
    return;
  }
  ...
});
```

- Mismo patron que productos.js: esperar DOMContentLoaded, buscar el elemento, verificar que existe.
- `return` dentro del if: Corta la ejecucion de la funcion si el formulario no existe. Evita errores en cascada.

### Funcion validarProducto

```javascript
function validarProducto(datos) {
  if (datos.nombre.trim() === "") {
    alert("El nombre no puede estar vacio.");
    return false;
  }
  if (datos.precio <= 0 || isNaN(datos.precio)) {
    alert("El precio debe ser mayor a cero.");
    return false;
  }
  if (datos.stock < 0) {
    alert("El stock no puede ser negativo.");
    return false;
  }
  return true;
}
```

- `trim()`: Elimina espacios en blanco al inicio y al final. Evita que " " (un espacio) pase como nombre valido.
- `=== ""`: Comparacion estricta con string vacio.
- `isNaN(valor)`: Funcion que devuelve true si el valor NO es un numero (is Not a Number). Util para verificar que parseFloat funciono correctamente.
- `||`: Operador logico OR. La condicion es verdadera si cualquiera de las dos partes es verdadera.
- `return false` / `return true`: La funcion devuelve un booleano. El codigo que la llama usa ese valor para decidir si continua o no.

### Evento submit

```javascript
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  ...

  const nuevoProducto = {
    nombre: nombre,
    precio: parseFloat(precio),
    stock: parseInt(stock) || 0
  };

  if (!validarProducto(nuevoProducto)) {
    return;
  }

  alert(`Exito! El producto "${nuevoProducto.nombre}" fue registrado por $${nuevoProducto.precio.toFixed(2)}.`);
  formulario.reset();
});
```

- `addEventListener("submit", funcion)`: Escucha el evento submit (cuando se presiona el boton de tipo submit o se presiona Enter en un campo).
- `evento.preventDefault()`: Cancela el comportamiento por defecto del formulario, que seria recargar la pagina y perder todos los datos.
- `.value`: Propiedad de los inputs que devuelve el texto que el usuario escribio. Siempre es un string.
- `parseFloat(precio)`: Convierte el string "9.99" al numero 9.99. Necesario para hacer calculos matematicos.
- `parseInt(stock) || 0`: parseInt convierte a entero. Si stock esta vacio, parseInt devuelve NaN (falsy), y el operador || usa 0 como valor por defecto.
- `!validarProducto(nuevoProducto)`: Llama a la funcion de validacion. Si devuelve false, el ! lo convierte en true y entramos al if para cortar la ejecucion.
- `formulario.reset()`: Limpia todos los campos del formulario a sus valores iniciales.

---

## 5. Resumen de Conceptos Clave para el Parcial

| Concepto | Donde se usa | Para que sirve |
|---|---|---|
| `const` / `let` | Todo el JS | const = no reasignable, let = puede cambiar |
| `===` | Validaciones | Comparacion estricta (valor Y tipo) |
| Template literals | console.log, alert | Insertar variables en strings con backticks |
| `forEach` | cargarProductos | Recorrer arreglos de forma moderna |
| `document.createElement` | crearTarjetaProducto | Crear elementos HTML desde JS |
| `appendChild` | crearTarjetaProducto | Insertar elementos en el DOM |
| `DOMContentLoaded` | Ambos JS | Esperar que el HTML este listo |
| `evento.preventDefault()` | alta-producto.js | Evitar recarga del formulario |
| `parseFloat` / `parseInt` | alta-producto.js | Convertir strings a numeros |
| `trim()` | validarProducto | Eliminar espacios en blanco |
| `border-radius` | CSS | Redondear esquinas de elementos |
| `box-shadow` | CSS | Sombra exterior de elementos |
| `transform: translateY` | CSS | Mover elementos verticalmente |
| `transition` | CSS | Animar cambios de estilo suavemente |
| `position: absolute` | CSS carrito | Flotar el panel sobre el contenido |
| `z-index` | CSS carrito | Controlar que elemento queda encima |
| `display: grid` | CSS catalogo | Grilla automatica y responsiva |
| `display: flex` | CSS header/forms | Alinear elementos en fila o columna |
| `@media query` | CSS | Estilos condicionales por tamano de pantalla |
| `var(--variable)` | CSS | Usar variables definidas en :root |

---

## 6. Actualizaciones de la Última Sesión (Carrito, Checkout, Detalles y Filtros)

En la última actualización agregamos funcionalidades de una tienda real. Aquí está la explicación técnica de las decisiones y el código:

### Carrito Desplegable Interactivo (Mobile-Friendly)

**Antes:** El carrito se abría con CSS usando `:hover`. Esto era problemático en celulares porque no existe un "hover" real con pantallas táctiles.
**Ahora:** Lo controlamos con JavaScript escuchando el evento `click`.

- `classList.toggle('active')`: Usamos JS para agregar o quitar la clase `.active` al carrito al hacer clic. En CSS, cambiamos el selector a `.carrito.active .carrito-panel` para mostrarlo.
- `e.stopPropagation()`: Evita que el clic en el botón se propague ("burbujee") hacia el `document`, lo que causaría que el carrito se cierre inmediatamente.
- **Cierre al hacer clic afuera**: Agregamos un listener global en `document` que verifica `if (!carrito.contains(e.target))`. Si el usuario hace clic en un elemento que no es hijo del carrito, removemos la clase `.active`.

### Animaciones Premium y Pseudo-elementos (CSS)

- `transform: translateY(15px) scale(0.95)`: Estado inicial del carrito oculto. Está un poco más abajo y un 5% más pequeño.
- `transform-origin: top right`: Define que la animación de crecimiento nazca desde la esquina superior derecha (donde está el ícono), dando una sensación física realista.
- `transition: ... cubic-bezier(0.34, 1.56, 0.64, 1)`: Una curva de aceleración matemática. Ese "1.56" significa que la animación se pasa del 100% y luego retrocede, creando un efecto de **rebote elástico (bouncy)**.
- `::before`: Pseudo-elemento de CSS. Creamos un triángulo (un cuadrado rotado a 45 grados) directamente en CSS sin agregar HTML extra. Lo posicionamos arriba (`top: -6px`) para que simule una flecha que conecta el panel con el botón del carrito.

### Filtro de Categorías Dinámico (DOM y JavaScript)

Convertimos botones estáticos en un sistema de filtrado en tiempo real sin recargar la página:

- `data-categoria="..."`: Agregamos atributos de datos (Data Attributes) a los `<li>` en HTML. Son ideales para guardar información personalizada que JS puede leer.
- `this.getAttribute('data-categoria')`: En el evento click, `this` hace referencia al botón presionado. Extraemos la categoría que queremos filtrar.
- `cargarProductos(productosAMostrar)`: Modificamos la función principal para que acepte un parámetro por defecto (`listadoProductos`). Al filtrar, llamamos a `filtrarPorCategoria()`, obtenemos el sub-arreglo (por ejemplo, solo juegos) y se lo pasamos a `cargarProductos()`. Esta función vacía el HTML actual (`innerHTML = ""`) y re-dibuja solo los productos filtrados en milisegundos.

### Página de Detalle Dinámica (`URLSearchParams`)

En lugar de crear 50 archivos HTML para 50 productos, creamos una sola plantilla (`detalle-producto.html`) que se llena dinámicamente:

- **Paso de parámetros**: Cambiamos el link de "Ver más" a `detalle-producto.html?id=1`. El `?id=1` es una **Query String** (cadena de consulta).
- `new URLSearchParams(window.location.search)`: API nativa de navegadores para leer la URL. Nos permite extraer el ID del producto que el usuario quiere ver.
- `Array.prototype.find()`: Usamos `listadoProductos.find(p => p.id === productId)` para buscar en nuestra "base de datos" el producto exacto que coincida con el ID de la URL. Si lo encuentra, usamos manipulación del DOM (`textContent`, `src`) para inyectar su nombre, descripción, precio y foto en la plantilla HTML vacía.

### Diseño de la pantalla de Checkout

- **Grid de dos columnas**: En `checkout.html`, usamos `display: grid; grid-template-columns: 1fr 350px;`. El formulario de facturación toma la fracción disponible (`1fr`) y el resumen de compra tiene un ancho fijo de `350px`.
- **Posición "Sticky"**: Al contenedor del resumen de compra le aplicamos `position: sticky; top: 2rem;`. Esto hace que, si el usuario scrollea hacia abajo llenando un formulario largo, el resumen de compra se quede "pegado" en la pantalla siguiéndolo.

### Simulación de Inicio de Sesión (Sin JavaScript)

Creamos un flujo de login simulado utilizando únicamente propiedades nativas de HTML y CSS, sin requerir código JavaScript:

- **Redirección nativa (`<form action="...">`)**: En `login.html`, el formulario utiliza `action="alta-producto.html"` y `method="GET"`. Al presionar el botón de tipo `submit`, el navegador procesa el formulario nativamente y redirige a la página de destino automáticamente. Esto demuestra cómo el HTML base está diseñado para manejar flujos de datos básicos.
- **Flujo de Navegación Consistente**: Actualizamos todas las barras de navegación (`<nav>`) del sitio para que el botón "Iniciar Sesión" apunte consistentemente a `login.html`.
- **Cambio de Estado Simulado (Feedback Visual)**: Dentro de `alta-producto.html` (que actúa como el panel de control privado), modificamos el botón superior para que luzca rojo y diga "Cerrar Sesión" (apuntando a `index.html`). Esto crea una ilusión de un sistema con gestión de estados (Logueado / No Logueado) aprovechando únicamente rutas de HTML estático.
- **Experiencia de Usuario (UX) en CSS**: Aplicamos estilos dedicados (`.login-container`, `.login-form input:focus`) para darle un aspecto moderno. Cuando un usuario hace clic en un input, combinamos `outline: none;` con un `box-shadow` y un cambio de `border-color` para indicarle claramente dónde está escribiendo.

### Carrito de Compras con Persistencia (`localStorage`)

Transformamos el carrito de compras de una maqueta estática a un sistema 100% dinámico:

- **Módulo Centralizado (`carrito.js`)**: Separamos la lógica del carrito en su propio archivo JavaScript y lo enlazamos en todos los HTMLs. Así, cualquier página puede acceder al estado del carrito.
- **Uso de `localStorage`**: Usamos la API del navegador `localStorage.setItem` y `getItem` para guardar un "string" con el JSON de los productos elegidos. Así, los datos sobreviven aunque el usuario cierre el navegador o cambie de página.
- **Actualización Dinámica del DOM**: Creamos la función `renderizarCarrito()` que vacía (`innerHTML = ""`) el panel del carrito y lo reconstruye en base al `localStorage`. Suma los precios multiplicados por cantidad, calcula impuestos en el Checkout, y actualiza los badges rojos (contadores de productos) en la barra de navegación.

### Integración con Base de Datos en la Nube (Supabase y Fetch API)

Migramos el catálogo estático en memoria a una base de datos real (PostgreSQL en Supabase):

- **Arquitectura Cliente-Servidor**: Eliminamos el arreglo duro (`listadoProductos`) y ahora pedimos los datos a internet mediante la API REST autogenerada de Supabase.
- **Peticiones Asíncronas (`async/await` y `fetch`)**: Usamos la función `fetch` mandando nuestras llaves (`apikey`) en los encabezados (`headers`) para autorizarnos. Al usar `await res.json()`, pausamos la ejecución hasta que los datos llegan desde Estados Unidos/Europa, permitiendo renderizar el catálogo con datos 100% reales.
- **Inserción de Datos (Método POST)**: En `alta-producto.js`, el formulario ahora hace un `fetch` con el método `POST`, enviando los datos del nuevo producto como texto JSON en el `body`. Supabase lo recibe y lo inserta en la tabla real.

### Relaciones de Bases de Datos y Comentarios Dinámicos

Agregamos una capa de feedback social mediante una tabla de comentarios relacional:

- **Claves Foráneas (`FOREIGN KEY`)**: En la base de datos creamos la tabla `comentarios` con el campo `producto_id`, relacionando un producto con "muchas" reseñas. Le agregamos `ON DELETE CASCADE` para mantener la integridad (si se borra la app, se borran sus reseñas).
- **Consultas Filtradas en la API**: En `detalle-producto.html`, cruzamos datos. Primero pedimos el producto, y luego hacemos otra consulta `fetch` a `/rest/v1/comentarios?producto_id=eq.ID_DEL_PRODUCTO` para traer solo las reseñas de esa App en particular.
### Búsqueda Dinámica en Tiempo Real (Live Search)

Implementamos un buscador que filtra el catálogo instantáneamente mientras el usuario escribe:

- **Evento `input`**: A diferencia del evento `click`, este evento se dispara cada vez que el valor del `<input>` cambia (al presionar una tecla o borrar). Esto nos permite filtrar sin necesidad de recargar ni presionar un botón.
- **`Array.prototype.filter()` y `includes()`**: Usamos JavaScript para convertir el texto a minúsculas (`toLowerCase()`) y filtrar el arreglo original buscando coincidencias en el título, categoría o descripción, para luego redibujar el HTML solo con los productos filtrados.

---

## Glosario Rápido para el Parcial (Definiciones Breves)

- **`fetch()`**: Es una función nativa de JavaScript que sirve para hacer peticiones por internet (HTTP) a un servidor o API y traer datos (o enviarlos) sin recargar la página.
- **`async` / `await`**: Son palabras clave que indican que una función tomará tiempo en ejecutarse (ej: descargar datos). Pausan la ejecución del código en esa línea hasta que el servidor responda, evitando errores de "datos no encontrados".
- **`localStorage`**: Es una pequeña base de datos integrada en el navegador web. Permite guardar información en formato texto que no se borra aunque el usuario cierre la pestaña o la computadora.
- **DOM (Document Object Model)**: Es la representación estructural del HTML que hace el navegador. Mediante JavaScript podemos manipular el DOM para agregar, borrar o modificar elementos (`divs`, textos, clases) en pantalla en tiempo real.
- **`URLSearchParams`**: Una herramienta de JavaScript que sirve para leer fácilmente las variables enviadas en la URL (como `?id=5`), ideal para cargar el detalle correcto de un producto.
- **REST API**: Es un conjunto de reglas que permite a nuestra página comunicarse con un servidor externo (como Supabase) pidiendo información a través de direcciones de internet (URLs).
- **JSON (JavaScript Object Notation)**: Es el formato estándar de texto ligero que se usa para enviar y recibir datos por internet (como arreglos u objetos).
- **FOREIGN KEY (Clave Foránea)**: Es una columna en una base de datos relacional que une dos tablas; por ejemplo, la columna `producto_id` en la tabla de comentarios que la vincula con la tabla de productos.
- **CSS Grid y Flexbox**: Son dos sistemas de diseño de CSS moderno. Flexbox alinea elementos en una sola fila o columna, mientras que Grid crea cuadrículas complejas de dos dimensiones.

---

## 🎨 Rediseño UX Premium ("Taste Design" y Modo Oscuro)

Para llevar la aplicación de un simple prototipo a un producto final de nivel empresarial, implementamos un sistema de diseño premium, enfocado en el minimalismo y la legibilidad:

### 1. Variables CSS y Consistencia
Todo el sistema de colores y sombras está controlado por **Variables CSS (`:root`)**. Esto nos permitió cambiar la aplicación entera a un "Modo Oscuro" en segundos, redefiniendo las variables de color sin tocar el código fuente de los HTML.

### 2. Estética "Modo Oscuro" (Dark Theme)
- **Fondos de Pizarra (`Slate`):** Abandonamos el clásico blanco que encandila y el negro puro (`#000`), usando azules grisáceos muy oscuros (`Slate 900` para el body y `Slate 800` para las tarjetas). Esto es mucho más relajante para la vista y se considera un estándar de alta gama (Premium UI).
- **Contraste Limpio:** El texto principal ahora es "blanco nieve" (`Slate 50`), logrando una lectura óptima sin el "efecto halo" que produce el texto 100% blanco puro.

### 3. Glassmorphism (Efecto Cristal)
El `<header>` de la página utiliza propiedades modernas como `backdrop-filter: blur(12px)`. Esto aplica un desenfoque (tipo cristal esmerilado) a los elementos que pasan por detrás cuando el usuario hace scroll, creando sensación de profundidad y fluidez.

### 4. Botones "Fantasma" (Ghost UI)
En lugar de saturar la pantalla con bloques grandes de colores brillantes, aplicamos la tendencia de botones "Fantasma" en los "Call to Action" (CTAs) como Login, Buscar y Añadir al Carrito. 
- **Estado Reposo:** Son transparentes con un borde fino (`border: 1px solid var(--color-borde)`), dándole prioridad al contenido principal.
- **Micro-interacciones (`hover`):** Al pasar el ratón, se iluminan sutilmente con una transición suave (`transition: all 0.3s cubic-bezier(...)`), el borde se vuelve más claro y el botón se eleva en el eje Y (`transform: translateY(-2px)`), generando un excelente *feedback* táctil.

### 5. Iconografía y Detalles del Carrito
- **Forma de Píldora (`Pill Shape`):** El botón del carrito tiene `border-radius: 99px;`, dándole una forma redondeada súper moderna.
- **Badge Integrado:** El número de productos (`.badge`) perdió las sombras duras y el color rojo de error. Ahora utiliza el azul índigo primario del sitio y está centrado usando `display: flex`, integrándose pacíficamente en la barra superior.
- **Icono Universal:** Cambiamos el vector SVG genérico por el contorno universal de un carrito de supermercado (`Lucide/Feather icons`), garantizando que cualquier usuario entienda su función en un segundo.

---

## IDEAS PARA SUMAR A LA APP

- **Sistema de favoritos** — guardar productos en localStorage como "wishlist"
- **Ordenar productos** — dropdown para ordenar por precio (menor a mayor, mayor a menor)
- **Paginación** — mostrar de a 6 productos y un botón "ver más"
- **Historial de pedidos** — guardar en Supabase las compras del checkout
- **Registro de usuarios** — usar Supabase Auth para login/registro real
- **Sistema de stock** — agregar campo `stock` en Supabase y deshabilitar el botón si es 0
- **Precio con descuento** — mostrar precio original tachado y precio rebajado

---

## CONCEPTOS MODERNOS DE JAVASCRIPT (con ejemplos del proyecto)

---

### `async` — "Esta función hace cosas que tardan"

Cuando ponés `async` delante de una función, le estás diciendo a JavaScript:
*"Esta función puede tener operaciones lentas (como pedir datos a internet). No rompas todo mientras espera."*

```js
// productos.js — línea 10
async function obtenerProductosDeSupabase() {
  // Esta función es async porque adentro vamos a esperar datos de internet
}
```

**Sin `async`**, si intentás usar `await`, el código directamente no funciona — da error de sintaxis.

---

### `await` — "Pará acá y esperá que esto termine"

`await` solo se puede usar DENTRO de una función `async`. Le dice al navegador:
*"Antes de seguir con la próxima línea, esperá que esta operación termine."*

```js
// productos.js — línea 12-20
async function obtenerProductosDeSupabase() {
  try {
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/productos?select=*`, {
    //                ↑ PARA acá y espera que llegue la respuesta del servidor
      headers: SUPABASE_HEADERS
    });

    const datos = await respuesta.json();
    //            ↑ PARA acá y espera que se parsee el JSON

    return datos; // recién acá continúa
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}
```

**Analogía real:** Pedís un café. `await` es quedarte parado en la barra esperando. Sin `await`, agarrarías el vaso vacío y lo llevarías a la mesa antes de que lo llenen.

---

### Por qué es necesario esperar (el problema sin async/await)

```js
// MAL — sin await, datos llega VACÍO porque la petición no terminó
function obtenerProductosMal() {
  const respuesta = fetch(`${SUPABASE_URL}/rest/v1/productos?select=*`);
  const datos = respuesta.json(); // ERROR: respuesta es una Promise, no tiene .json() directo
  return datos; // esto es undefined o una Promise sin resolver
}

// BIEN — con await, esperamos cada paso
async function obtenerProductosBien() {
  const respuesta = await fetch(...); // esperamos la respuesta HTTP
  const datos = await respuesta.json(); // esperamos que se convierta a objeto JS
  return datos; // ahora sí tiene los productos
}
```

---

### `try` / `catch` — Manejar errores en código async

Cuando algo puede fallar (como una petición de red), envolvés el código en `try/catch`.

```js
// productos.js — línea 11-27
try {
  // Intentar esto...
  const respuesta = await fetch(...);
  const datos = await respuesta.json();
  return datos;
} catch (error) {
  // Si CUALQUIER línea del try falla, caemos acá
  console.error("Error al obtener productos:", error);
  return []; // devolvemos array vacío para no romper la app
}
```

Sin `try/catch`, si el servidor está caído o no hay internet, la app tira un error sin manejar y el usuario ve una pantalla rota.

---

### `fetch` — Pedir datos a internet

`fetch` es la función del navegador para hacer peticiones HTTP (GET, POST, etc.).

```js
// productos.js — línea 12
const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/productos?select=*`, {
  headers: SUPABASE_HEADERS
  // headers = "credenciales" que mandamos para que Supabase nos deje entrar
});

// respuesta.ok → true si el servidor respondió con código 200-299 (éxito)
if (!respuesta.ok) {
  throw new Error("Error en la respuesta de Supabase");
}

// .json() convierte el texto de la respuesta en un array/objeto de JavaScript
const datos = await respuesta.json();
```

**¿Qué son los `headers`?** Datos extra que viajan con la petición. Nuestra `SUPABASE_KEY` va en el header `apikey` para autorizarnos.

---

### Promise — Una promesa de valor futuro

`fetch` y `.json()` devuelven **Promises** (promesas). Una Promise es un objeto que representa algo que todavía no terminó pero va a terminar (o fallar).

3 estados posibles:
- **Pending** → esperando
- **Fulfilled** → llegó con éxito
- **Rejected** → falló

Hay dos formas de trabajar con ellas:

**Forma moderna — `async/await`** (recomendada):
```js
async function obtenerProductosDeSupabase() {
  const respuesta = await fetch(...); // espera
  const datos = await respuesta.json(); // espera
  return datos;
}
```

**Forma clásica — `.then()` / `.catch()`** (usada en `cargarDetalleProducto`):
```js
// productos.js — línea 214
fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${productId}&select=*`, {
  headers: SUPABASE_HEADERS
})
.then(respuesta => respuesta.json())   // cuando llegó, parsear
.then(productos => {                    // cuando parseó, usar
  const producto = productos[0];
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  // ...
})
.catch(error => {                       // si algo falló
  console.error("Error:", error);
});
```

Ambas hacen exactamente lo mismo. `async/await` es más legible porque parece código normal de arriba a abajo.

---

### `localStorage` — Guardar datos en el navegador

El navegador tiene una pequeña "base de datos" local llamada `localStorage`. Los datos **sobreviven a cerrar el navegador**.

```js
// carrito.js — línea 33
// Guardar (solo acepta texto, por eso usamos JSON.stringify)
localStorage.setItem("carritoEcommerce", JSON.stringify(carrito));
// JSON.stringify convierte el array [{ id: 1, nombre: "App" }] → '[ { "id": 1, "nombre": "App" } ]'

// carrito.js — línea 27
// Leer
const guardado = localStorage.getItem("carritoEcommerce");
if (guardado) {
  carrito = JSON.parse(guardado); // convierte el texto de vuelta a array
}
```

**¿Por qué `JSON.stringify` y `JSON.parse`?** `localStorage` solo guarda **texto**. `stringify` serializa el objeto a texto, `parse` lo deserializa de vuelta.

---

### Arrow Functions `() => {}` — Funciones cortas

Son una forma abreviada de escribir funciones anónimas.

```js
// Función tradicional
function doble(n) {
  return n * 2;
}

// Arrow function equivalente
const doble = n => n * 2;

// Usada en carrito.js — línea 75
carrito.forEach(item => {
  totalPrecio += item.precio * item.cantidad;
  totalCantidad += item.cantidad;
});
```

Si solo hay una línea de retorno, se puede omitir `{}` y `return`.

---

### `forEach` / `filter` / `find` — Métodos de arrays

Reemplazan el `for` clásico con código más expresivo.

**`forEach`** — hacer algo con cada elemento (no devuelve nada):
```js
// carrito.js — línea 102
badges.forEach(badge => {
  badge.textContent = totalCantidad; // actualiza cada badge en la página
});
```

**`filter`** — quedarse con los que cumplen una condición (devuelve un NUEVO array):
```js
// carrito.js — línea 56
carrito = carrito.filter(item => item.id !== id);
// Devuelve todos los items EXCEPTO el que tiene ese id → lo "elimina"

// productos.js — línea 389
const productosFiltrados = listadoProductos.filter(p =>
  p.nombre.toLowerCase().includes(texto)
);
// Devuelve solo los productos cuyo nombre contiene el texto buscado
```

**`find`** — encontrar el primero que cumple la condición (devuelve el OBJETO o `undefined`):
```js
// carrito.js — línea 39
const existe = carrito.find(item => item.id === producto.id);
if (existe) {
  existe.cantidad++; // si ya está, aumentamos la cantidad
} else {
  carrito.push({ ...producto, cantidad: 1 }); // si no está, lo agregamos
}
```

**Diferencia clave:**
| Método | Devuelve | Uso típico |
|---|---|---|
| `forEach` | nada | ejecutar algo por cada elemento |
| `filter` | nuevo array | quedarme con un subconjunto |
| `find` | un objeto o `undefined` | buscar un elemento específico |

---

### Spread Operator `...` — Copiar objetos

```js
// carrito.js — línea 45
carrito.push({ ...producto, cantidad: 1 });
//             ↑ copia TODAS las propiedades de producto
//                           ↑ y agrega (o pisa) cantidad: 1
```

Sin el spread estarías guardando la **referencia** al objeto original. Si `producto` cambia después, también cambiaría el que está en el carrito. El spread crea una **copia independiente**.

---

### `URLSearchParams` — Leer parámetros de la URL

```js
// productos.js — línea 205
// URL actual: detalle-producto.html?id=5

const urlParams = new URLSearchParams(window.location.search);
// window.location.search → "?id=5"

const productId = parseInt(urlParams.get('id'));
// urlParams.get('id') → "5" (string)
// parseInt(...)       → 5  (número)
```

Esto permite tener UNA sola página `detalle-producto.html` que muestra distintos productos según el `?id=` en la URL.

---

### `setTimeout` — Ejecutar código después de un tiempo

```js
// carrito.js — línea 186
setTimeout(() => {
  toast.style.opacity = "1";   // aparece
}, 10); // espera 10 milisegundos

setTimeout(() => {
  toast.style.opacity = "0";   // desaparece
  setTimeout(() => toast.remove(), 300); // después de la animación, lo borra del DOM
}, 3000); // espera 3 segundos
```

Se usa para el "toast" de notificación al agregar un producto al carrito.

---

### Template Literals — Strings con variables adentro

Con backticks `` ` `` podés meter variables usando `${}`:

```js
// productos.js — línea 65
pPrecio.textContent = `$${producto.precio.toFixed(2)}`;
// Si precio es 1500 → "$1500.00"

// config.js — línea 10
'Authorization': `Bearer ${SUPABASE_KEY}`
// → "Bearer sb_publishable_DrFa6s-..."
```

---

### FLUJO COMPLETO DE LA APP (de arriba a abajo)

```
1. Usuario abre catalogo.html
2. Navegador carga los scripts en orden:
      config.js   → define SUPABASE_URL y SUPABASE_HEADERS
      carrito.js  → carga el carrito de localStorage
      productos.js → registra el DOMContentLoaded

3. HTML termina de cargar → dispara DOMContentLoaded

4. productos.js detecta que existe #productos-container
   → llama a obtenerProductosDeSupabase() [función async]
      → fetch a Supabase [await → espera respuesta]
      → respuesta.json()  [await → espera parseo]
      → devuelve array de productos

5. cargarProductos(productos) recorre el array con forEach
   → para cada uno llama a crearTarjetaProducto()
   → inserta cada tarjeta en el DOM con appendChild

6. Usuario puede:
   → Filtrar por categoría (click en botón → filtrarPorCategoria → cargarProductos)
   → Buscar (input → filter sobre listadoProductos → cargarProductos)
   → Agregar al carrito (click → agregarAlCarrito → guardar en localStorage → renderizarCarrito)
   → Ver detalle (click "Ver más" → detalle-producto.html?id=X)

7. En detalle-producto.html:
   → URLSearchParams lee el ?id=X de la URL
   → fetch a Supabase filtrando por ese id
   → llena el HTML con los datos del producto
   → hace otro fetch para cargar los comentarios de ese producto
```

---

### PREGUNTAS FRECUENTES DE PARCIAL

**¿Diferencia entre `==` y `===`?**
- `==` compara valor con conversión de tipo: `"5" == 5` → `true`
- `===` compara valor Y tipo sin conversión: `"5" === 5` → `false`
- Siempre usar `===`.

**¿Qué devuelve `filter` si ningún elemento cumple la condición?**
- Un array vacío `[]`. Nunca devuelve `null` ni `undefined`.

**¿Qué pasa si `find` no encuentra nada?**
- Devuelve `undefined`. Siempre verificar con `if (existe)` antes de usarlo.

**¿Puedo usar `await` fuera de una función `async`?**
- No. Da error de sintaxis. Solo funciona dentro de funciones marcadas con `async`.

**¿`localStorage` se comparte entre páginas del mismo sitio?**
- Sí. Por eso el carrito persiste entre `catalogo.html`, `detalle-producto.html` y `checkout.html`.

**¿Qué pasa si `fetch` falla (no hay internet)?**
- Lanza un error que captura el `catch`. En nuestro código devolvemos `[]` para que la app no se rompa.

**¿Cuándo uso `const` y cuándo `let`?**
- `const` cuando el valor nunca se reasigna (objetos, funciones, la mayoría de variables).
- `let` cuando el valor cambia (contadores, el array `carrito` que se reemplaza en `filter`).
