# TryzUp Project Hub — Roadmap

> Centro de operaciones y portafolio vivo del ecosistema TryzUp.

TryzUp Project Hub evoluciona mediante entregas pequeñas, verificables y documentadas.

Cada fase debe dejar evidencia visible en el repositorio, el producto y el portafolio.

---

## Estado actual

**Versión pública:** `v0.1.2`  
**Estado de `main`:** incluye mejoras posteriores a `v0.1.2` pendientes de agrupar en una próxima release.  
**Etapa actual:** fundación visual, responsive y arquitectónica consolidada.  
**Siguiente fase principal:** FASE 02 — contrato profesional de `projects.json`.

La interfaz principal, la arquitectura frontend inicial, el despliegue automático, la navegación responsive y la identidad visual ya cuentan con una base estable.

El siguiente objetivo es consolidar el modelo de datos que alimentará proyectos, métricas, filtros, actividad y futuras integraciones.

---

# Hitos completados

## Fundación del proyecto

- Repositorio profesional configurado.
- Arquitectura inicial del frontend.
- Separación de componentes, servicios y utilidades.
- Datos externos mediante archivos JSON.
- Identidad visual TryzUp / PcHomy aplicada.
- GitHub Pages habilitado.
- GitHub Actions operativo.
- Flujo de trabajo basado en ramas feature y Pull Requests.
- Formateo automatizado con Prettier.

## Visual Fidelity

Se completó la construcción y refinamiento visual del dashboard principal.

Incluye:

- Hero principal.
- navegación desktop.
- sidebar.
- navegación móvil mediante drawer.
- tarjetas de proyectos.
- métricas principales.
- Roadmap.
- actividad reciente.
- sección **Aprender construyendo**.
- adaptación de componentes entre distintos breakpoints.

### Responsive Fidelity Pass 2

Se completó una segunda pasada de refinamiento responsive con validación manual en:

- `1440px`
- `1280px`
- `1024px`
- `768px`
- `430px`
- `390px`
- `375px`
- `320px`

Criterios validados:

- Sin overflow horizontal accidental.
- Drawer móvil funcional.
- Jerarquía visual preservada.
- Project Cards adaptativas.
- Layouts desktop, tablet y mobile estables.
- Scrollbars internos refinados.
- Secciones Roadmap, Activity y Learning estables en responsive.

**Evidencia:** PR #5 — `style: complete responsive fidelity pass 2`

https://github.com/TryzUp-Nexus/tryzup-project-hub/pull/5

## Identidad oficial de tecnologías de aprendizaje

La sección **Aprender construyendo** fue refinada utilizando iconografía oficial para tecnologías reconocidas.

Integraciones actuales:

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Actions / CI/CD
- JSON

La identidad visual TryzUp se mantiene para conceptos sin una marca oficial específica, como:

- Schema
- Validation

Los assets oficiales se almacenan localmente en:

`assets/img/learning/`

**Evidencia:** PR #6 — `feat: add official learning technology brand icons`

https://github.com/TryzUp-Nexus/tryzup-project-hub/pull/6

---

# Roadmap de desarrollo

| Fase | Alcance                                 | Estado                                            |
| ---- | --------------------------------------- | ------------------------------------------------- |
| 01   | Fundación y repositorio                 | ✅ Completa                                       |
| 02   | Contrato profesional `projects.json`    | 🔵 Siguiente                                      |
| 03   | Dashboard y métricas                    | 🟡 Fundación entregada                            |
| 04   | Project Cards reutilizables             | 🟡 Fundación entregada                            |
| 05   | Estados, prioridades y progreso medible | ⚪ Planificada                                    |
| 06   | Búsqueda y filtros                      | 🟡 Fundación entregada                            |
| 07   | Roadmap y timeline                      | 🟡 Fundación entregada                            |
| 08   | Actividad reciente                      | 🟡 Fundación entregada                            |
| 09   | Responsive y accesibilidad              | ✅ Responsive completado / accesibilidad continua |
| 10   | GitHub Pages                            | ✅ Operativo                                      |
| 11   | GitHub Actions                          | ✅ Operativo                                      |
| 12   | Integración GitHub API                  | ⚪ Planificada                                    |
| 13   | Módulo de proyectos reutilizable        | ⚪ Planificada                                    |
| 14   | `v1.0.0` estable                        | ⚪ Planificada                                    |

---

# Fases

## FASE 01 — Fundación y repositorio

**Estado:** ✅ Completa

### Objetivo

Construir una base técnica, visual y operativa desde la cual TryzUp Project Hub pueda evolucionar sin rehacer su arquitectura.

### Entregado

- repositorio GitHub;
- estructura modular;
- HTML semántico;
- CSS organizado;
- JavaScript modular;
- componentes reutilizables iniciales;
- servicios de datos;
- utilidades;
- identidad TryzUp;
- identidad PcHomy;
- GitHub Pages;
- GitHub Actions;
- responsive foundation;
- Visual Fidelity;
- navegación móvil;
- iconografía oficial para tecnologías de aprendizaje.

---

## FASE 02 — Modelo de datos `projects.json`

**Estado:** 🔵 Siguiente

### Objetivo

Definir un contrato de datos estable y profesional para todos los proyectos administrados por TryzUp Project Hub.

### Trabajo previsto

- identificador único;
- slug;
- nombre;
- categoría;
- tipo de proyecto;
- estado;
- prioridad;
- descripción;
- progreso;
- stack tecnológico;
- fase actual;
- fechas;
- repositorio;
- demo;
- último logro;
- última actualización;
- vínculos con aprendizaje;
- metadata preparada para futuras integraciones con GitHub.

### Criterio de aceptación

El frontend debe poder construir sus tarjetas, métricas, actividad y filtros utilizando el contrato definido, sin depender de datos específicos escritos directamente en los componentes.

---

## FASE 03 — Dashboard y métricas

**Estado:** 🟡 Fundación entregada

Actualmente existen:

- proyectos activos;
- proyectos en desarrollo;
- avance global;
- aprendizajes aplicados.

### Para completar la fase

- migrar las métricas al contrato definitivo de datos;
- definir reglas consistentes de cálculo;
- manejar proyectos sin progreso porcentual definido.

---

## FASE 04 — Project Cards

**Estado:** 🟡 Fundación entregada

Las tarjetas actuales ya son generadas mediante componentes.

### Pendiente

- adaptarlas al contrato definitivo de `projects.json`;
- ampliar metadata;
- preparar navegación hacia futuras vistas individuales;
- mantener consistencia entre tarjetas, filtros y métricas.

---

## FASE 05 — Estados, prioridades y progreso

**Estado:** ⚪ Planificada

Formalizar:

- estados permitidos;
- niveles de prioridad;
- metodología de progreso;
- reglas para proyectos sin porcentaje definido;
- criterios de transición entre estados.

---

## FASE 06 — Búsqueda y filtros

**Estado:** 🟡 Fundación entregada

Ya existen controles de búsqueda y filtrado.

### Pendiente

- conectarlos al modelo definitivo;
- ampliar criterios;
- ordenar resultados;
- validar combinaciones de filtros.

---

## FASE 07 — Roadmap y timeline

**Estado:** 🟡 Fundación entregada

Actualmente existe una representación resumida dentro del dashboard.

### Pendiente

- convertir las fases en datos reutilizables;
- evitar duplicación innecesaria entre documentación y aplicación;
- estudiar un timeline dinámico;
- evaluar un futuro `data/roadmap.json`.

---

## FASE 08 — Actividad reciente

**Estado:** 🟡 Fundación entregada

Actualmente existe una vista de actividad reciente asociada al ecosistema.

### Pendiente

- formalizar el modelo de eventos;
- integrar futuras fuentes;
- preparar historial completo;
- evaluar integración con GitHub.

---

## FASE 09 — Responsive y accesibilidad

**Estado:** ✅ Responsive completado / accesibilidad continua

Se completaron múltiples pasadas de fidelidad responsive, incluyendo validación desde `320px` hasta `1440px`.

La accesibilidad continuará siendo revisada de forma transversal durante las siguientes fases.

### Criterios permanentes

- navegación por teclado;
- foco visible;
- semántica HTML;
- contraste;
- reducción de movimiento;
- experiencia usable en distintos tamaños de pantalla.

---

## FASE 10 — GitHub Pages

**Estado:** ✅ Operativo

El proyecto cuenta con despliegue público mediante GitHub Pages.

---

## FASE 11 — GitHub Actions

**Estado:** ✅ Operativo

El repositorio cuenta con automatización asociada al flujo de publicación.

---

## FASE 12 — GitHub API

**Estado:** ⚪ Planificada

### Objetivo

Obtener información pública de repositorios para enriquecer el Hub.

Posibles datos:

- repositorios;
- actividad;
- commits;
- releases;
- metadata técnica relevante.

Nunca se deben exponer credenciales, tokens o información privada.

---

## FASE 13 — Módulo reutilizable de proyectos

**Estado:** ⚪ Planificada

Extraer la arquitectura de Project Hub para que los módulos de proyectos puedan reutilizarse dentro del ecosistema TryzUp.

---

## FASE 14 — `v1.0.0` estable

**Estado:** ⚪ Planificada

La versión `1.0.0` requerirá:

- modelo de datos estable;
- módulos reutilizables;
- UI estable;
- accesibilidad validada;
- documentación completa;
- pipeline estable;
- comportamiento probado;
- despliegue reproducible.

---

# Flujo de entrega

```text
Issue
  ↓
Feature branch
  ↓
Implementación
  ↓
Pruebas
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Review
  ↓
Merge a main
  ↓
Despliegue automático
```

---

# Regla de documentación

Cada documento tiene una función clara:

- `docs/ROADMAP.md` → hacia dónde vamos, estado actual e hitos.
- `CHANGELOG.md` → qué cambió entre versiones o releases.
- Pull Requests → detalle técnico de implementación, pruebas y validación.

No se debe duplicar innecesariamente el mismo nivel de detalle en los tres lugares.

---

# Regla de datos públicos

TryzUp Project Hub solo debe contener información técnica apta para exposición pública.

Nunca deben incorporarse:

- credenciales;
- tokens;
- contraseñas;
- identificadores personales;
- contratos privados;
- información confidencial de clientes;
- información comercial privada.

---

# Principio de desarrollo

> Cada nueva capacidad debe dejar evidencia visible, reutilizable y verificable.

**Honor, Estrategia y Corazón en Alto.**
