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
