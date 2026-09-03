import { getProjects, getLearning, calculateStats } from "./services/projectService.js";
import { SummaryTile } from "./components/summary-tile.js";
import { ProjectCard } from "./components/project-card.js";
import { ProjectVisual } from "./components/project-visuals.js";
import { FilterBar } from "./components/filter-bar.js";
import { mountIcons } from "./components/icons.js";
import { DEFAULT_FILTERS, filterProjects } from "./utils/filters.js";
import { formatDate, sortByDateDescending } from "./utils/dates.js";

const byId = (id) => document.getElementById(id);

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]
  );

const roadmap = [
  "Fundación y repositorio",
  "Modelo de datos projects.json",
  "Dashboard base",
  "Project Cards",
  "Estados, prioridades y progreso",
  "Búsqueda y filtros",
  "Roadmap / timeline",
  "Actividad reciente",
  "Responsive y accesibilidad",
  "GitHub Pages",
  "GitHub Actions",
  "GitHub API",
  "Modularización reutilizable",
  "v1.0.0 estable",
];

function renderStats(projects, learning) {
  const stats = calculateStats(projects, learning);

  byId("stats").innerHTML = [
    SummaryTile("Proyectos activos", stats.active, `${projects.length} registrados`, "folder"),
    SummaryTile("En desarrollo", stats.development, "Estado actual", "code"),
    SummaryTile(
      "Avance global",
      stats.average === null ? null : `${stats.average}%`,
      "Solo proyectos medidos",
      "progress"
    ),
    SummaryTile(
      "Aprendizajes aplicados",
      stats.appliedLearning,
      `${learning.length} evidencias`,
      "graduation"
    ),
  ].join("");
}

function renderProjects(projects) {
  byId("project-grid").innerHTML = projects.map(ProjectCard).join("");
  byId("result-count").textContent =
    `${projects.length} proyecto${projects.length === 1 ? "" : "s"}`;
  byId("empty-state").hidden = projects.length !== 0;
}

function renderRoadmap() {
  const details = [
    "Estructura base, repositorio, identidad visual y publicación inicial.",
    "Definir contrato profesional, campos, validación y metodología de progreso.",
    "Consolidar resumen, métricas y composición del panel principal.",
    "Refinar tarjetas reutilizables alimentadas desde projects.json.",
  ];

  byId("roadmap-list").innerHTML = roadmap
    .slice(0, 4)
    .map((phase, index) => {
      const number = index + 1;
      const phaseLabel = String(number).padStart(2, "0");
      const state = number === 1 ? "is-complete" : number === 2 ? "is-current" : "";
      const status = number === 1 ? "Completa" : number === 2 ? "Próxima" : "Pendiente";

      return `<article class="roadmap-item ${state}"><span class="roadmap-dot" aria-hidden="true"></span><div><strong><em>FASE ${phaseLabel}</em><span>•</span> ${phase}</strong><p>${details[index]}</p></div><span class="phase-status">${status}</span></article>`;
    })
    .join("");
}

function renderActivity(projects) {
  byId("activity").innerHTML = sortByDateDescending(projects)
    .slice(0, 5)
    .map(
      (project) => `
        <article>
          ${ProjectVisual(project, "activity")}
          <div>
            <strong>${escapeHtml(project.name)}</strong>
            <p>${escapeHtml(project.lastAchievement)}</p>
          </div>
          <time datetime="${project.lastUpdate}">${formatDate(project.lastUpdate)}</time>
        </article>
      `
    )
    .join("");
}

function getLearningIcon(technology) {
  const key = String(technology).toLowerCase();

  if (["html5", "css3", "javascript"].includes(key)) {
    return "code";
  }

  if (["git", "github"].includes(key)) {
    return "link";
  }

  if (key === "ci/cd") {
    return "activity";
  }

  return "resources";
}

function renderLearning(records) {
  const skills = records.flatMap((record) =>
    (record.technologies || []).map((technology) => ({
      technology,
      area: record.area,
      progress: record.progress,
      source: record.title,
    }))
  );

  byId("learning-grid").innerHTML = skills
    .map(
      (skill) => `
        <article class="learning-card learning-skill-card" title="${escapeHtml(skill.source)}">
          <span
            class="learning-skill-icon"
            data-icon="${getLearningIcon(skill.technology)}"
            aria-hidden="true"
          ></span>

          <div class="learning-skill-copy">
            <small>${escapeHtml(skill.area)}</small>
            <strong>${escapeHtml(skill.technology)}</strong>
          </div>

          <strong class="learning-percent">${skill.progress}%</strong>

          <div
            class="learning-meter"
            role="progressbar"
            aria-label="Progreso de ${escapeHtml(skill.technology)}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${skill.progress}"
          >
            <span style="width:${skill.progress}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function setupNavigation() {
  const toggle = byId("menu-toggle");
  const sidebar = byId("sidebar");
  const backdrop = byId("sidebar-backdrop");
  const mobileQuery = window.matchMedia("(max-width: 1050px)");

  const setMenuState = (open) => {
    sidebar.classList.toggle("is-open", open);
    backdrop?.classList.toggle("is-visible", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open && mobileQuery.matches);
  };

  const closeMenu = () => setMenuState(false);

  toggle.addEventListener("click", () => {
    setMenuState(!sidebar.classList.contains("is-open"));
  });

  backdrop?.addEventListener("click", closeMenu);

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) closeMenu();
  });
}

async function init() {
  setupNavigation();

  try {
    const [projects, learning] = await Promise.all([getProjects(), getLearning()]);

    renderStats(projects, learning);
    renderProjects(projects);
    renderRoadmap();
    renderActivity(projects);
    renderLearning(learning);

    byId("filters").innerHTML = FilterBar(projects);

    mountIcons();

    const form = byId("filter-form");

    const applyFilters = () => {
      const values = Object.fromEntries(new FormData(form));
      const filtered = filterProjects(projects, values);

      const sorted = [...filtered].sort((a, b) =>
        values.sort === "name"
          ? a.name.localeCompare(b.name, "es")
          : values.sort === "progress"
            ? (b.progress ?? -1) - (a.progress ?? -1)
            : new Date(b.lastUpdate) - new Date(a.lastUpdate)
      );

      renderProjects(sorted);
    };

    form.addEventListener("input", applyFilters);
    form.addEventListener("change", applyFilters);
    form.addEventListener("reset", () =>
      requestAnimationFrame(() => renderProjects(filterProjects(projects, DEFAULT_FILTERS)))
    );
  } catch (error) {
    console.error(error);
    byId("project-grid").innerHTML =
      `<div class="empty-state">No fue posible cargar el panel.</div>`;
  }
}

init();
