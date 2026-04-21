# Guía de Estudio para el Parcial: Aplicación Web

Este documento explica de forma clara y directa los conceptos de **HTML5** y **CSS3** aplicados en tu proyecto. Ha sido diseñado para que puedas entender y defender el código frente a cualquier pregunta del parcial.

---

## 1. Conceptos de HTML5 Utilizados

El HTML (HyperText Markup Language) es el esqueleto de tu proyecto. En lugar de usar puros `<div>` (etiquetas sin significado), empleamos un enfoque **semántico**. Esto significa que las etiquetas describen su propio contenido.

### Etiquetas Semánticas Base
*   **`<!DOCTYPE html>`**: Obligatorio en la primera línea. Le dice al navegador que estamos usando la última versión de HTML (HTML5).
*   **`<header>`**: Representa el encabezado de nuestra página. Contiene el título principal de la tienda y la barra de navegación.
*   **`<nav>`**: Sirve para agrupar enlaces de navegación principal del sitio (Inicio, Catálogo, Login).
*   **`<main>`**: Es el contenedor de toda la información "importante" y exclusiva de la página (El contenido principal).
*   **`<section>` / `<article>`**: `section` divide estructuralmente el sitio (ej. Sección de Categorías, Sección de Productos). `article` lo usamos para las `.tarjeta`. Un `article` significa "contenido independiente", es decir, si extraemos una tarjeta y la ponemos en otro lado, sigue teniendo sentido por sí misma (es un producto completo).
*   **`<footer>`**: Es el pie de página, contiene el copyright u otra info general y de fin de sección.

### Formularios (`<form>`)
En `formulario.html` y `alta-producto.html`:
*   **`<form method="POST">`**: Caja que agrupa elementos interactivos. `method="POST"` significa que los datos viajarían ocultos en el cuerpo de la petición (ideal para contraseñas o datos que cambian cosas en un servidor).
*   **`<input>` / `<textarea>` / `<select>`**: Elementos donde el usuario interactúa.
    *   *Nota importante:* Para enlazar un texto descriptivo con un `input`, usamos `<label for="identificador">` y al `input` le ponemos un `id="identificador"`. Esto es fundamental para accesibilidad (lectores de pantalla) y hace que si el usuario toca la palabra, se seleccione el input.

### Etiquetas Multimedia
*   **`<img>`**: Insertamos imágenes utilizando el atributo `src="..."` (la ruta de la imagen) y `alt="..."` (texto alternativo).
*   **`<svg>`**: (Scalable Vector Graphics). A diferencia de `<img>`, el SVG son coordenadas matemáticas dibujadas por el navegador. Lo usamos para dibujar íconos nítidos como el ícono del "carrito de compras".

---

## 2. Conceptos de CSS3 Utilizados

El CSS (Cascading Style Sheets) es lo que le da "belleza" a nuestro HTML. El archivo `estilos.css` usa técnicas muy valoradas en la modernidad.

### Las Variables (`:root`)
```css
:root {
    --color-primario: #2563eb;
    --color-fondo: #f8fafc;
}
```
*   **¿Para qué sirven?** Se definen de forma global en `:root` (el elemento más alto como la etiqueta html). Esto permite que, si en el futuro quieres cambiar el diseño entero a color verde, solo debas cambiar un código en la línea 2 y mágicamente toda la página cambiará de color.

### El Flexbox (`display: flex`)
Esta es la regla más preguntada en todos los parciales. Flexbox es un modo de visualización que adapta elementos dinámicamente.
Lo utilizamos continuamente en la barra de navegación (`.header-controls`) y en el menú.
*   **`display: flex;`**: Convierte al contenedor en flexible. Por defecto, pone a todos los hijos uno al lado del otro en horizontal.
*   **`align-items: center;`**: Alinea los elementos verticalmente al centro.
*   **`justify-content: space-between;`**: Separa los elementos horizontalmente, enviando uno bien a la izquierda y el otro bien a la derecha. (Lo usamos en el encabezado).
*   **`gap: 1rem;`**: Genera un espacio de "aire" exacto y perfecto entre los hijos del contenedor.

### La Grilla (`display: grid`)
Lo usamos en tú `catalogo.html` (`.productos-grid`).
```css
.productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```
*   **¿Para qué sirve?** El grid es mágico. `repeat(auto-fill, ...)` significa que el navegador calculará cuántas tarjetas entran automáticamente en función del tamaño de la pantalla. El `minmax(280px, 1fr)` especifica que las tarjetas **nunca midan menos de 280 píxeles**, pero que si sobra espacio se estiren y ocupen el resto equitativamente (`1fr`). Esto hace que el catálogo sea "Responsivo" (adaptable) sin mucho esfuerzo.

### Efectos Visuales
*   **`transition: all 0.3s ease;`**: Hace que el CSS no cambie bruscamente, sino que los cambios de color de un botón o los desplazamientos duren 0.3 segundos, generando animaciones suaves.
*   **`:hover`**: Es un pseudo-selector. Se activa ÚNICAMENTE cuando el mouse del usuario pasa por encima. Es el causante de que se eleven las tarjetas y se cambien a color negro ciertas cosas.
*   **`transform: translateY(-4px);`**: Lo usamos en las tarjetas al hacer `:hover`. Este comando desplaza virtualmente el objeto hacia arriba en el eje Y (vertical) creando el efecto de que la tarjeta "flota" o "brinca".

### Responsividad (`@media query`)
En la zona final del archivo verás esto:
```css
@media (max-width: 768px) {
   /* Reglas que solo aplican en pantallas de celulares */
}
```
*   **¿Para qué sirve?** Son inyecciones condicionales de CSS. El código que está adentro solo se leerá, aplicará y validará si la pantalla del usuario mide menos de 768px de ancho. Si es una PC o Desktop, el navegador ignora ese bloque de código. Aquí lo usamos para apilar los menús en caso de pantallas móviles y prevenir fallos de vista.

---

## 3. Explicación de Componentes Específicos

En tu proyecto, hay tres componentes clave donde combinamos HTML y CSS de forma avanzada: el Carrito, los Formularios y el Catálogo.

### El Carrito de Compras
*   **HTML**: Se estructuró usando un contenedor principal `<div class="carrito">` posicionado de forma relativa. Dentro, hay un botón `.carrito-btn` que incluye un ícono SVG (Scalable Vector Graphics, que no pierde calidad) y un `.badge` para mostrar la cantidad de productos en rojo. El contenido desplegable vive oculto dentro de `.carrito-panel`, el cual encierra filas `.carrito-item` para cada producto y un `.carrito-total` al final.
*   **CSS**: El panel del carrito (`.carrito-panel`) está oculto inicialmente usando `opacity: 0` y `visibility: hidden`, y desplazado un poco hacia abajo con `transform: translateY(10px)`. Empleamos el selector `:hover` (y `:focus-within` por accesibilidad) en el contenedor `.carrito` para mostrar este panel al pasar el mouse. Al hacerlo, cambiamos la opacidad a `1` y restablecemos su posición a `translateY(0)`, logrando una animación de entrada suave. Además, el panel usa `position: absolute` para flotar "por encima" de la página web sin empujar a otros elementos.

### Los Formularios (Contacto e Iniciar Sesión)
*   **HTML**: Están agrupados de manera muy limpia usando un contenedor `.form-container` para centrar todo el contenido. Cada par de "etiqueta" y "campo de texto" (input o textarea) se envuelve en un `div` con la clase `.form-group`. **Dato importante:** empleamos adecuadamente la dupla `<label for="id_input">` e `<input id="id_input">`. Esto permite que si haces clic en la etiqueta, el navegador seleccione automáticamente el campo.
*   **CSS**:
    *   `.form-container`: Utiliza `margin: 0 auto;` junto con un `max-width` para no volverse gigantesco en monitores anchos, manteniéndose siempre centrado y con un fondo blanco que lo hace resaltar.
    *   `.form-group`: Al aplicarles `display: flex; flex-direction: column;`, forzamos a que la etiqueta (label) se ubique arriba y el campo de texto se fije justo debajo. Es más natural de leer.
    *   **Estados interactivos**: A los inputs usamos el pseudo-selector `:focus` (se activa cuando el usuario está escribiendo adentro). En ese estado, cambiamos el color del borde (`border-color: var(--color-primario)`) y le agregamos una sombra exterior o resplandor (`box-shadow`), indicándole visualmente y sin lugar a dudas al usuario dónde está posicionado.

### El Catálogo de Productos
*   **HTML**: El área principal está envuelta en la etiqueta semántica `<main>`. Allí introdujimos un buscador alineado con Flexbox y la lista de todos los productos contenida en un `<div class="productos-grid">`. Las "cartas" individuales de cada producto usan `<article class="tarjeta">` porque su contenido tiene sentido por sí mismo.
*   **CSS**:
    *   **CSS Grid (`.productos-grid`)**: Usamos la "magia" pura de CSS Grid (`display: grid`) que mencionamos antes (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`). Es lo que hace a las tarjetas acomodarse como bloques de tetris solas sin tener que programar de uno por uno para diferentes tamaños de pantalla.
    *   **Tarjetas (`.tarjeta`)**: A cada tarjeta le aplicamos `display: flex; flex-direction: column;` para apilar la imagen, título, precio (`.precio`), descripción y el botón. Al hacerles `:hover`, aplicamos una transición que las eleva (`transform: translateY(-4px)`) y acentúa su sombra (`box-shadow`), invitando visualmente al usuario a dar clic en "Ver más".

---

## 4. Dinamismo con JavaScript (`productos.js`)

Para evitar tener el HTML lleno de información estática y repetida, y para preparar la página antes de poder conectarla en el futuro a una base de datos real, dinamizamos el catálogo usando JavaScript, mientras conservamos íntegramente la estructura y el diseño original.

### La Base de Datos Simulada (Arreglo de Objetos)
Definimos una variable `const listadoProductos = [ {...}, {...} ]`. Aquí guardamos un listado (arreglo) donde cada elemento es un producto con toda su información clave (`nombre`, `precio`, `imagen`, etc.). Esto permite que la información esté totalmente centralizada desde donde se procesará.

### La Fábrica de Tarjetas (`crearTarjetaProducto`)
Esta función "ensambla" toda la estructura visual en la memoria.
*   **`document.createElement('etiqueta')`**: Usamos esto para construir cada pieza del rompecabezas desde JavaScript. Se crean virtualmente los `article`, las imágenes `img`, y los textos con `p` o `h3`.
*   **`appendChild()`**: Esta fue la técnica utilizada para introducir (anidar) los textos y la imagen dentro de la caja principal (el `article`). 
*   **El Plan B Visual (`img.onerror`)**: Aplicamos una lógica extra. A la imagen le indicamos que, en caso de fallar o romper su enlace en internet, llame a una función de *fallback* para reemplazarse automáticamente por una imagen por defecto, evitando así romper estéticamente el catálogo.

### El Renderizado Activo (`cargarProductos` y `DOMContentLoaded`)
*   **Manipulando el DOM**: La función `cargarProductos` busca con `document.querySelector("#productos-container")` a un contenedor div específicamente preparado en el HTML original y lo limpia. Seguido, recorre con un bucle `for` el listado cargando uno por uno los productos y sumándolos visualmente en pantalla simulando una tienda en vivo.
*   **`DOMContentLoaded`**: **Concepto crítico**. Utilizamos este evento para indicarle firmemente al navegador: *"Prohibido ejecutar mi script hasta que el árbol HTML esté 100% construido y dibujado"*. Esto previene los posibles y fatales cuelgues que ocurren cuando el JavaScript intenta meter información en una "caja" que el navegador aún ni siquiera alcanzó a procesar en la página.


Tu productos.js hace esto:

guarda productos en una lista,
convierte cada producto en una tarjeta HTML,
busca un contenedor en la página,
inserta todas las tarjetas automáticamente.
Versión corta de mejora
Si querés dejarlo un poco más limpio, podés cambiar esta parte