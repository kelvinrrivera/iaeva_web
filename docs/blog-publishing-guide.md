# Guía para Publicar Nuevos Artículos en el Blog de IAEVA

Esta guía explica paso a paso cómo publicar nuevos artículos en el blog de IAEVA utilizando nuestro sistema basado en HTML.

## Índice
1. [Visión General del Sistema](#visión-general-del-sistema)
2. [Preparación de Imágenes](#preparación-de-imágenes)
3. [Actualización de Metadatos](#actualización-de-metadatos)
4. [Creación de Contenido HTML](#creación-de-contenido-html)
5. [Estructura del Índice de Contenido](#estructura-del-índice-de-contenido)
6. [Contenido Multilingüe](#contenido-multilingüe)
7. [Verificación y Publicación](#verificación-y-publicación)
8. [Solución de Problemas](#solución-de-problemas)

## Visión General del Sistema

El blog de IAEVA utiliza un sistema basado en componentes React que muestra contenido HTML almacenado en archivos TypeScript. Este enfoque proporciona un rendimiento óptimo sin necesidad de procesamiento de MDX en el navegador.

**Archivos principales:**

- `src/lib/blog/blog-metadata.ts`: Contiene los metadatos de todos los artículos.
- `src/lib/blog/blog-content.ts`: Almacena el contenido HTML principal de los artículos.
- `src/lib/blog/blog-content-part2.ts`: Contiene partes adicionales del contenido para artículos extensos.
- `src/lib/blog/blog.css`: Estilos específicos para el blog.

## Preparación de Imágenes

1. **Formatos recomendados:**
   - Utilizar formato `.webp` para todas las imágenes siempre que sea posible.
   - Optimizar las imágenes para web (compresión, dimensiones adecuadas).

2. **Ubicación de las imágenes:**
   - Guardar las imágenes en `public/images/blog/`.
   - Usar nombres descriptivos con guiones (ej: `impacto-ausencias-citas.webp`).

3. **Dimensiones recomendadas:**
   - Imágenes de portada: 1200×630px (16:9)
   - Imágenes interiores: 800px de ancho máximo

## Actualización de Metadatos

Para añadir un nuevo artículo, primero debes registrar sus metadatos en `src/lib/blog/blog-metadata.ts`:

```typescript
// Añadir el nuevo artículo al array blogPostsMetadata
{
  title: "Título del nuevo artículo",
  description: "Descripción concisa que aparecerá en la vista previa y metadatos",
  date: "2025-06-20", // Formato YYYY-MM-DD
  slug: "url-amigable-del-articulo",
  author: "Nombre del Autor",
  coverImage: "/images/blog/imagen-portada.webp",
  readingTime: "10 min de lectura",
  language: "es", // o "fr" para francés
  category: "Categoría del Artículo", // Usar categorías existentes preferentemente
  tags: ["etiqueta1", "etiqueta2", "etiqueta3"]
}
```

> **Importante:** Para contenido multilingüe, añade una entrada adicional con el mismo `slug` pero diferente `language`.

## Creación de Contenido HTML

El contenido del artículo se almacena como HTML en `src/lib/blog/blog-content.ts`. Para añadir un nuevo artículo:

1. **Crea una nueva constante para tu artículo:**

```typescript
// Contenido del nuevo artículo
const nuevoArticuloHTML = {
  es: `
    <div class="article-content">
      <!-- Metadatos estructurados para SEO -->
      <div itemscope itemtype="https://schema.org/Article">
        <meta itemprop="headline" content="Título del artículo">
        <meta itemprop="description" content="Descripción del artículo">
        <meta itemprop="image" content="https://iaeva.com/images/blog/imagen-portada.webp">
        <meta itemprop="datePublished" content="2025-06-20">
        <div itemprop="author" itemscope itemtype="https://schema.org/Person">
          <meta itemprop="name" content="Nombre del Autor">
        </div>
      </div>

      <!-- Índice del artículo (se mostrará en mobile y se extraerá para el sidebar en desktop) -->
      <div class="article-toc">
        <h3>Índice</h3>
        <ul>
          <li><a href="#seccion1">Primera sección</a></li>
          <li><a href="#seccion2">Segunda sección</a></li>
          <!-- Más secciones -->
        </ul>
      </div>

      <!-- Contenido del artículo -->
      <section id="seccion1">
        <h2>Primera sección</h2>
        <p>Contenido de la primera sección...</p>
        
        <img src="/images/blog/imagen-seccion1.webp" alt="Descripción de la imagen" class="blog-image" />
        
        <ul>
          <li>Primer punto destacado</li>
          <li>Segundo punto destacado</li>
        </ul>
      </section>

      <!-- Más secciones -->
    </div>
  `
};
```

2. **Para artículos extensos** puedes separar el contenido en varios archivos:

```typescript
// En blog-content.ts
import { nuevoArticuloHTMLPart2 } from './blog-content-part2';

const nuevoArticuloHTML = {
  es: `
    <!-- Primera parte del contenido -->
    ${nuevoArticuloHTMLPart2}
  `
};
```

3. **Registra el contenido en el objeto `blogContent`:**

```typescript
export const blogContent: BlogContent = {
  "inteligencia-artificial-sector-salud": iaEnSaludHTML,
  "automatizacion-reduce-ausencias-clinicas": automatizacionHTML,
  "url-amigable-del-articulo": nuevoArticuloHTML
};
```

## Estructura del Índice de Contenido

El blog cuenta con un índice de contenido que se muestra:
- En dispositivos móviles: como parte del contenido al inicio del artículo.
- En escritorio: como una barra lateral fija (sticky) que resalta automáticamente la sección actual.

Para que el sistema funcione correctamente, debes seguir estas pautas:

### 1. Estructura del TOC en HTML

```html
<div class="article-toc">
  <h3>Índice</h3>
  <ul>
    <li><a href="#impacto">El impacto de X</a></li>
    <li><a href="#razones">Razones principales</a></li>
    <li><a href="#solucion">Nuestra solución</a></li>
  </ul>
</div>
```

### 2. Estructura de las secciones

Cada sección del contenido debe:
- Estar dentro de una etiqueta `<section>` 
- Tener un atributo `id` que coincida exactamente con los enlaces del índice (sin el #)
- Contener un encabezado (h2, h3) que coincida con el texto del enlace

```html
<section id="impacto">
  <h2>El impacto de X</h2>
  <!-- Contenido de la sección -->
</section>

<section id="razones">
  <h2>Razones principales</h2>
  <!-- Contenido de la sección -->
</section>
```

### 3. Funcionamiento del resaltado automático

El sistema:
- Detecta automáticamente qué sección está visible en pantalla mediante Intersection Observer
- Resalta el enlace correspondiente en la barra lateral
- Se actualiza al hacer scroll por la página

> **Importante:** No es necesario implementar JavaScript adicional para esto. El sistema detecta y extrae automáticamente el índice del `article-toc` y lo muestra en el sidebar con el resaltado dinámico.

## Componentes HTML Disponibles

El sistema permite utilizar HTML estándar más las siguientes clases CSS especiales:

| Componente | Clase CSS | Descripción |
|------------|-----------|-------------|
| Imágenes | `blog-image` | Estilo para imágenes con bordes redondeados y sombra |
| Tablas | `blog-table` | Tabla con estilos responsive |
| Índice | `article-toc` | Contenedor para el índice del artículo |
| Destacado | `text-highlight` | Texto destacado con fondo coloreado |
| CTA | `cta-box` | Caja de llamada a la acción |
| Botón | `button button-primary` | Botón de acción principal |

## Contenido Multilingüe

Para añadir el mismo artículo en otro idioma:

1. **Añade los metadatos para el otro idioma** en `blog-metadata.ts` (mismo slug, diferente language)
2. **Añade el contenido traducido** usando la misma estructura:

```typescript
const nuevoArticuloHTML = {
  es: `
    <!-- Contenido en español -->
  `,
  fr: `
    <!-- Contenu en français -->
  `
};
```

## Verificación y Publicación

Antes de publicar un nuevo artículo:

1. **Ejecuta el servidor de desarrollo:**
   ```
   npm run dev
   ```

2. **Verifica el artículo** en todas las rutas:
   - Lista de artículos: `http://localhost:8082/blog`
   - Detalle del artículo: `http://localhost:8082/blog/url-amigable-del-articulo`

3. **Comprueba la visualización en distintos tamaños de pantalla:**
   - Pantalla grande: El sidebar del índice debe mostrarse en la izquierda
   - Pantalla móvil: El índice debe aparecer al inicio del artículo
   - Verifica que el resaltado automático funciona al hacer scroll

4. **Verifica los enlaces internos** y que todas las imágenes se muestren correctamente.

5. **Realiza un commit y push** de los cambios para publicar el artículo.

## Solución de Problemas

### El sidebar del índice no aparece
- Verifica que el artículo contiene la estructura correcta del `article-toc`
- Comprueba que los enlaces del TOC siguen el formato `<a href="#id-seccion">`
- Confirma que las secciones tienen IDs que coinciden exactamente con los enlaces

### El resaltado no funciona correctamente
- Verifica que el ID de cada sección coincide exactamente con los enlaces del índice
- Asegúrate de que la sección tiene suficiente altura para ser detectada en pantalla
- Comprueba que estás usando la etiqueta `<section>` para cada sección

### Imágenes que no aparecen
- Verifica que la ruta comience con `/images/blog/`
- Comprueba que el archivo existe en `public/images/blog/`
- Asegúrate de que el nombre coincide exactamente (mayúsculas/minúsculas)

### Contenido HTML mal renderizado
- Verifica que todas las etiquetas HTML estén correctamente cerradas
- Evita usar caracteres especiales sin escapar (`<`, `>`, `&`, `"`)
- Si necesitas usar backticks (`) dentro del contenido HTML, escápalos con backslash: \`

---

Para cualquier duda o sugerencia sobre esta guía, contacta al equipo de desarrollo. 