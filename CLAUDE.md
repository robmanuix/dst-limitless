# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

DocSite del Design System de **LIMITLESS by Serenza**, construido con Astro a partir de la plantilla `robmanuix/dst-template`. Documenta tokens visuales (colores, tipografía, espaciado, radios, elevaciones) y componentes interactivos (botones/CTA, inputs, chips y badges, notificaciones) con builders en tiempo real.

## Flujo de trabajo estándar

El proceso de un nuevo proyecto siempre sigue este orden:

1. **Fuente de verdad en Figma** — file key `y199aurtOkJT44LQU6ed3o` (LimitLess by Serenza APP). Los valores de `Front/src/data/tokens.js` salen de ese archivo
2. **Construir el DocSite localmente** — nunca se usa Git durante el desarrollo
3. **Subir a GitHub al finalizar** — solo cuando el DocSite está completo

## Comandos

```bash
cd Front
npm install       # primera vez
npm run dev       # servidor en http://localhost:4321
npm run build     # build de producción
```

Para iniciar un proyecto nuevo desde esta plantilla (usando degit, sin historial git):
```bash
npx degit robmanuix/dst-template nombre-nuevo-proyecto
cd nombre-nuevo-proyecto/Front
npm install
```

Al terminar el proyecto:
```bash
git init
git add .
git commit -m "feat: initial docsite"
git remote add origin https://github.com/usuario/repo.git
git push -u origin main
```

## Arquitectura

```
Front/src/
  layouts/Layout.astro          # Archivo central — sidebar, nav, TODO el CSS global
  pages/
    index.astro                 # Dashboard hero
    tokens/                     # Solo visualización, sin builders
      colors.astro
      typography.astro
      spacing.astro
      border-radius.astro
      elevations.astro
    components/                 # Con builders interactivos
      buttons.astro             # CTA (Free, Premium, Success, Secondary)
      inputs.astro              # Radio, Chip, Slider
      chips-badges.astro        # Chip Eje, Chip Lives, Badge Premium, Badge Notificación
      notifications.astro       # 6 tipos
    interfaces/                 # Galerías de pantallas por versión de UI
      free-dark.astro  free-light.astro  premium-masculino.astro  premium-femenino.astro
    support.astro
```

**Interfaces:** datos en `src/data/interfaces.js`, componente `components/ScreenGallery.astro` (grid + lightbox). Imágenes webp en `public/interfaces/<versión>/NN-slug.webp`. Gratuito claro muestra placeholders hasta que se copien capturas con el mismo nombre que las de `free-dark` en `public/interfaces/free-light/`.

### `Layout.astro` — archivo central

Contiene todo lo que es global: sidebar de navegación, CSS custom properties, estilos base, y el **sistema de builder completo** (clases `.builder`, `.prop-group`, `.pill`, `.ctrl-toggle`, `.icon-picker`, etc.). Cualquier estilo que se use en más de una página va aquí.

Props del layout: `title`, `section`, `subNav?`, `pageTitle?`, `pageDesc?`. Cuando no se pasan `pageTitle`/`pageDesc` (como en el dashboard), no se renderiza encabezado de página.

## CSS Custom Properties

Definidas en `Layout.astro`. Para adaptar a un nuevo proyecto, solo cambiar estos valores:

```css
--prim-500: #fead77;   /* acento/principal (durazno) */
--prim-600: #8a4a33;   /* texto/enlace sobre claro */
--prim-700: #653024;   /* café, active */
--prim-100: #fff1e7;   /* fondo sutil */
--on-prim:  #653024;   /* texto sobre prim-500 */
--neutral-300: #cbcdd2;
--border: #e5e7eb;
--surface-base: #f5f6f8;
--txt-secondary: #727880;
--r-md: 6px;
--r-lg: 10px;
```

Color secundario/premium: `#e0a94f` (oro). Los componentes se previsualizan sobre `.builder-preview.dark` (`#653024`, fondo/base) o `.dark-premium` (`#121212`).

## Patrón de builder (páginas de componentes)

Todas las páginas de componentes siguen la misma estructura y **orden fijo de bloques**:

1. Constructor (builder dos columnas: `280px` props | `1fr` preview)
2. Propiedades del componente (tabla)
3. HTML generado (code block dinámico con botón Copiar)
4. CSS completo (code block estático con botón Copiar)

### Estructura HTML del builder

```html
<div class="builder">
  <div class="builder-panel">
    <!-- Pills para selección única -->
    <div class="prop-group">
      <span class="prop-label">Tipo</span>
      <div class="prop-pills" id="p-type">
        <button class="pill active" data-value="primary">Primario</button>
      </div>
    </div>
    <!-- Input de texto -->
    <div class="prop-group">
      <span class="prop-label">Etiqueta</span>
      <input class="prop-input" id="p-label" type="text" value="Confirmar" />
    </div>
    <!-- Toggle booleano -->
    <div class="prop-group prop-row">
      <span class="prop-label">Deshabilitado</span>
      <label class="ctrl-toggle">
        <input type="checkbox" id="p-disabled" />
        <span class="ctrl-track"></span>
      </label>
    </div>
    <!-- Toggle + icon picker -->
    <div class="prop-group">
      <div class="prop-inline">
        <span class="prop-label">Ícono izquierdo</span>
        <label class="ctrl-toggle">
          <input type="checkbox" id="p-icon-left-show" />
          <span class="ctrl-track"></span>
        </label>
      </div>
      <div id="p-icon-left-picker" class="icon-picker" style="display:none">
        <!-- icon-pills con set:html en Astro -->
      </div>
    </div>
  </div>
  <div class="builder-preview">
    <!-- componente vivo manipulado por JS -->
  </div>
</div>
```

### Patrón JS del builder (TypeScript en `<script>`)

```typescript
function getIconSvg(pickerId: string): string {
  return document.querySelector(`#${pickerId} .icon-pill.active`)?.innerHTML?.trim() ?? '';
}

function update() {
  const type = (document.querySelector('#p-type .pill.active') as HTMLElement)?.dataset.value ?? 'primary';
  // leer controles → actualizar preview → generar código
  (document.getElementById('comp-code') as HTMLElement).textContent = generatedCode;
}

// Pills
document.querySelectorAll('#p-type .pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.closest('.prop-pills')!.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    update();
  });
});

update(); // inicializar siempre al final
```

### Inyección de SVG con `set:html`

Los iconos se renderizan server-side en los `icon-pill` con la directiva `set:html` de Astro. El JS cliente los lee con `pill.innerHTML.trim()`. Esto evita duplicar el string SVG entre servidor y cliente.

```astro
{icons.map((ic) => (
  <button class="icon-pill" data-key={ic.key} set:html={ic.svg} />
))}
```

### Estilos de componente

Siempre con `<style is:global>` para que los estilos del componente (`.btn`, `.field-wrap`, etc.) sean accesibles al DOM manipulado por JS.

## Componentes — particularidades

**Botones (CTA):** 4 variantes (`cta-free|premium|success|secondary`), 320×56, radius pill. Sin íconos.

**Inputs:** Un solo builder con pills de componente (Radio/Chip/Slider); el JS muestra el grupo de State o Posición según el componente y regenera el HTML.

**Chips y Badges:** Builder con pills de componente; el fondo del preview cambia a `dark-premium` para los badges.

**Notificaciones:** 6 tipos; solo cambia la variable CSS `--acc` (triple RGB) por clase `notif-<tipo>`.

## Dashboard (index.astro)

Hero minimalista centrado. Sin `pageTitle`/`pageDesc`. Elementos: badge LL 72×72px con gradiente durazno→café + glow radial, título "Sistema de Diseño" en Montserrat 40px, subtítulo y línea meta con versión/año, 3 quick links horizontales (Tokens, Components, Support). Actualizar versión y año por proyecto.

## Figma base

- **File key:** `y199aurtOkJT44LQU6ed3o` (LimitLess by Serenza APP)
- **Páginas de docs:** Portada, Colores, Tipografía, Espaciado, Iconos, Radios, Elevaciones, Botones, Inputs, Chips y Badges, Notificaciones
- **Componentes:** 9, 22 variantes; 1905 íconos (Line, Monochrome, Solid, Thin Line)
- **Pendiente:** revisar contraste (texto blanco 65% sobre fondos translúcidos) y estados hover/focus de CTA, que Figma no define

## Advertencia: bug de `replace_all`

Si se usa `replace_all` para sustituir una cadena que aparece tanto en el bloque a reemplazar como en la definición de la variable de reemplazo, se produce una referencia circular que crashea el script silenciosamente (preview y code block quedan vacíos). Verificar siempre que `old_string` no aparezca dentro de `new_string`.
