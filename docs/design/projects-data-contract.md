# TryzUp Project Hub — Projects Data Contract

## Objetivo

Este documento define el contrato de datos utilizado por
**TryzUp Project Hub** para representar proyectos dentro del ecosistema TryzUp.

El contrato busca mantener una estructura consistente, validable y extensible
para todos los proyectos administrados por la plataforma.

La definición técnica formal se encuentra en:

`data/projects.schema.json`

---

## Principios del contrato

El modelo de proyectos debe cumplir los siguientes principios:

- Cada proyecto posee una identidad estable.
- Los estados utilizan valores normalizados.
- El avance distingue entre proyectos medibles y proyectos aún no medidos.
- Las fases poseen nombre visible y código técnico.
- Las fechas utilizan formato ISO `YYYY-MM-DD`.
- Los enlaces pueden representar repositorio y demo.
- Las tecnologías se almacenan como referencias simples y reutilizables.
- Los aprendizajes pueden relacionarse directamente con proyectos.
- El contrato debe poder evolucionar sin romper innecesariamente la interfaz.

---

## Estructura general

`projects.json` contiene un arreglo de proyectos.

Ejemplo conceptual:

```json
[
  {
    "id": "tryzup-project-hub",
    "slug": "tryzup-project-hub",
    "name": "TryzUp Project Hub",
    "description": "Panel modular de control y portafolio vivo para todo el ecosistema TryzUp.",
    "category": "Ecosistema TryzUp",
    "type": "product",
    "status": "development",
    "priority": "high"
  }
]