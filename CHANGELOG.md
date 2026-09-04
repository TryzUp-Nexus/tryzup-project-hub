# Changelog

Todos los cambios relevantes de TryzUp Project Hub se documentan en este archivo.

El formato sigue una estructura inspirada en **Keep a Changelog** y separa los cambios todavía no publicados de las versiones liberadas.

---

## [Unreleased]

### Added

- Iconografía oficial para tecnologías del módulo **Aprender construyendo**:
  - HTML5
  - CSS3
  - JavaScript
  - Git
  - GitHub
  - GitHub Actions / CI/CD
  - JSON
- Assets SVG locales en `assets/img/learning/`.
- Integración visual de marcas oficiales con fallback TryzUp para conceptos sin marca oficial específica.

### Changed

- Segunda pasada completa de Responsive Fidelity.
- Refinamiento de breakpoints desktop, tablet y mobile.
- Mejora de la composición del Hero en resoluciones intermedias.
- Mejora del drawer de navegación móvil.
- Optimización de Project Cards para pantallas pequeñas.
- Refinamiento responsive de Roadmap, Activity y Learning.
- Refinamiento de scrollbars internos.
- Ajustes visuales para integrar iconografía oficial con el tema Obsidian de TryzUp.

### Fixed

- Eliminación de overflow horizontal no deseado en los breakpoints validados.
- Corrección de inconsistencias responsive entre `1024px` y `320px`.

### Validation

Responsive Fidelity Pass 2 fue validado manualmente en:

- `1440px`
- `1280px`
- `1024px`
- `768px`
- `430px`
- `390px`
- `375px`
- `320px`

También se validó:

- drawer móvil abierto y cerrado;
- desktop y mobile con iconografía oficial;
- `npm run format`;
- `npm run format:check`;
- ausencia de regresiones visibles en Responsive Fidelity Pass 2.

### Pull Requests

- PR #5 — `style: complete responsive fidelity pass 2`
  - https://github.com/TryzUp-Nexus/tryzup-project-hub/pull/5
- PR #6 — `feat: add official learning technology brand icons`
  - https://github.com/TryzUp-Nexus/tryzup-project-hub/pull/6

---

## [0.1.2] - 2026-08-31

### Changed

- Refinamiento de la composición desktop para acercarla a la referencia visual aprobada.
- Rebalanceo del Hero, artwork, estadísticas, Project Cards, Roadmap y densidad de actividad.
- Incorporación de tabs compactas de estado y controles de ordenamiento de proyectos.
- Mejora de la atribución PcHomy, utilidades de navegación y presentación del sidebar.
- Preservación del comportamiento responsive sin overflow horizontal.

---

## [0.1.1] - 2026-08-31

### Added

- Identidad visual oficial de TryzUp Project Hub.
- Integración de marca TryzUp y PcHomy.
- Layout responsive para dashboard, sidebar y navegación.
- Design tokens reutilizables del modo Obsidian.
- Panel oficial de Roadmap.
- Assets oficiales de marca y referencia visual aprobada.

### Changed

- Rediseño de Project Cards, estadísticas y filtros.
- Rediseño de las secciones Roadmap, Learning y Recent Activity.
- Restauración del entrypoint de producción mediante JavaScript ES Modules.
- Mejora del responsive, foco de teclado y soporte de `prefers-reduced-motion`.

---

## [0.1.0] - 2026-08-31

### Added

- Fundación modular con HTML, CSS y JavaScript.
- Datos de proyectos y aprendizaje respaldados por JSON.
- Estadísticas automáticas del dashboard.
- Componentes reutilizables para proyectos, progreso, estados, filtros y estadísticas.
- Búsqueda y filtros por categoría, estado y prioridad.
- Roadmap, actividad reciente y módulo de aprendizaje.
- Fundamentos de responsive y accesibilidad.
- Workflow de despliegue mediante GitHub Pages.
- Roadmap de producto y documentación inicial.

---

## Convención

Los cambios nuevos deben registrarse primero bajo `[Unreleased]`.

Al crear una nueva release:

1. mover los cambios relevantes desde `[Unreleased]`;
2. crear una nueva sección con versión y fecha;
3. dejar `[Unreleased]` vacío y listo para el siguiente ciclo;
4. enlazar Pull Requests relevantes cuando aporten trazabilidad útil.

Ejemplo:

```md
## [0.1.3] - YYYY-MM-DD

### Added

- Nueva capacidad.

### Changed

- Mejora de comportamiento.

### Fixed

- Corrección importante.
```
