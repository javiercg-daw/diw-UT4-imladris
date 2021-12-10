# Imladris

## Diseño de Aplicaciones Web / Desarrollo Web en Entorno Cliente

### Autor: Javier Clavijo García

---

Cambios respecto del prototipo:

- General: pequeños cambios en tamaños de fuente, alineación de texto, etc. Motivo: mejorar la navegación a través de
  una mejor jerarquía visual, de una mejor distribución del texto, etc.
- General: cambio de la fuente First Order Light por First Order. Motivo: la primera está desactualizada y no se
  visualiza correctamente, sobre todo en pantallas de tamaño reducido.
- Detalle de personaje (desktop): *layout* de la parte derecha cambiado de mosaico a columna vertical (tipo F). Motivo:
  mejorar la legibilidad del texto, lograr una mejor distribución visual en casos en los que haya pocos elementos.
- Páginas de detalle (desktop): los elementos de la parte derecha se ajustan al ancho del texto. Motivo: no dejar tanto
  espacio vacío.
- Páginas de detalle (mobile/desktop): añadida cabecera a parte derecha de la página. Motivo: esclarecer el propósito de
  la página y mejorar la usabilidad.
- Header (desktop): animación de movimiento del marcador de pestaña de la barra de navegación cambiada a *fade in/fade
  out*. Motivo: la animación de movimiento requería demasiado tiempo de desarrollo.
- Header (mobile): barra de navegación cambiada por menú desplegable. Motivo: mejorar la usabilidad y el aspecto en
  modo *mobile*, ya que la barra de navegación quedaba demasiado estrecha.
- Header (mobile): añadido nombre del sitio web. Motivo: como hemos cambiado la barra de navegación por el menú
  desplegable hay espacio para incluirlo, lo que mejora la estética del sitio y lo hace más identificable.
- Footer (mobile): disposición de los elementos cambiada a lista vertical. Motivo: mejora la estética y la usabilidad,
  de forma similar al header.
- Inicio (desktop): botones de login/registro movidos a la parte superior central del contenedor. Motivo: no dejar
  espacio vacío.
- Contacto (mobile): imagen sin zoom. Motivo: que la imagen se vea completa en todos los dispositivos para lograr una
  mayor consistencia.
- Lista de películas/libros (mobile): eliminado zigzag en disposición de las imágenes. Motivo: simplificar la navegación
  por la página.

CSS:

- [x] Add responsive media queries
- [x] Add hamburger menu to mobile header
- [x] Add dark mode to home page
- [x] Add "tabs" to nav bar, transitions
- [x] Add transition to buttons
- [x] Add inline styles, etc.
- [x] Substitute placeholder texts
- [x] Add empty list message in film/character quote sections
- [x] Justify changes (in readme file)
- [x] Add some comments where needed
- [x] Fix character/film detail image
- [ ] Validate CSS (https://jigsaw.w3.org/css-validator), hand in assignment

JS:

- [x] Add regex validation to register/login (add a field or two to register)
- [x] Add error handling to fetch methods (redirect to 404 page)
- [x] Add image fetching
- [x] Document code