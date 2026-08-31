import { getProjects, getLearning, calculateStats } from "./services/projectService.js";
import { SummaryTile } from "./components/summary-tile.js";
import { ProjectCard } from "./components/project-card.js";
import { FilterBar } from "./components/filter-bar.js";
import { DEFAULT_FILTERS, filterProjects } from "./utils/filters.js";
import { formatDate, sortByDateDescending } from "./utils/dates.js";

const byId = (id) => document.getElementById(id);
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const roadmap = ["Fundación y repositorio","Modelo de datos","Dashboard","Project Cards","Estados, prioridades y progreso","Búsqueda y filtros","Roadmap / timeline","Actividad reciente","Responsive y accesibilidad","GitHub Pages","GitHub Actions","GitHub API","Modularización reutilizable","v1.0.0 estable"];

function renderStats(projects, learning) {
  const stats = calculateStats(projects, learning);
  byId("stats").innerHTML = [
    SummaryTile("Proyectos activos", stats.active, `${projects.length} registrados`),
    SummaryTile("En desarrollo", stats.development, "Estado actual"),
    SummaryTile("Avance global", stats.average === null ? null : `${stats.average}%`, "Solo proyectos medidos"),
    SummaryTile("Aprendizajes aplicados", stats.appliedLearning, `${learning.length} evidencias`)
  ].join("");
}

function renderProjects(projects) {
  byId("project-grid").innerHTML = projects.map(ProjectCard).join("");
  byId("result-count").textContent = `${projects.length} proyecto${projects.length === 1 ? "" : "s"}`;
  byId("empty-state").hidden = projects.length !== 0;
}

function renderRoadmap() {
  byId("roadmap-list").innerHTML = roadmap.map((phase, index) => {
    const number = index + 1;
    const state = number === 1 ? "is-complete" : number === 2 ? "is-current" : "";
    const status = number === 1 ? "Completa" : number === 2 ? "Próxima" : "Pendiente";
    const detail = number === 2 ? "Contrato definitivo de projects.json aún no iniciado." : "Ruta oficial del producto.";
    return `<article class="roadmap-item ${state}"><span class="roadmap-dot" aria-hidden="true"></span><div><strong>Fase ${String(number).padStart(2, "0")} · ${phase}</strong><p>${detail}</p></div><span class="phase-status">${status}</span></article>`;
  }).join("");
}

function renderActivity(projects) {
  byId("activity").innerHTML = sortByDateDescending(projects).slice(0, 5).map((project) => `<article><span class="activity-icon" aria-hidden="true">↗</span><div><strong>${escapeHtml(project.name)}</strong><p>${escapeHtml(project.lastAchievement)}</p></div><time datetime="${project.lastUpdate}">${formatDate(project.lastUpdate)}</time></article>`).join("");
}

function renderLearning(records) {
  byId("learning-grid").innerHTML = records.map((record) => `<article class="learning-card"><div><span class="category">${escapeHtml(record.area)}</span><strong class="learning-percent">${record.progress}%</strong></div><h3>${escapeHtml(record.title)}</h3><p>${escapeHtml(record.evidence)}</p><div class="technologies">${record.technologies.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div><div class="learning-meter" role="progressbar" aria-label="Progreso de ${escapeHtml(record.title)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${record.progress}"><span style="width:${record.progress}%"></span></div></article>`).join("");
}

function setupNavigation() {
  const toggle = byId("menu-toggle");
  const sidebar = byId("sidebar");
  toggle.addEventListener("click", () => { const open = sidebar.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(open)); });
  sidebar.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { sidebar.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }));
}

async function init() {
  setupNavigation();
  try {
    const [projects, learning] = await Promise.all([getProjects(), getLearning()]);
    renderStats(projects, learning); renderProjects(projects); renderRoadmap(); renderActivity(projects); renderLearning(learning);
    byId("filters").innerHTML = FilterBar(projects);
    const form = byId("filter-form");
    form.addEventListener("input", () => renderProjects(filterProjects(projects, Object.fromEntries(new FormData(form)))));
    form.addEventListener("reset", () => requestAnimationFrame(() => renderProjects(filterProjects(projects, DEFAULT_FILTERS))));
  } catch (error) {
    console.error(error);
    byId("project-grid").innerHTML = `<div class="empty-state">No fue posible cargar el panel.</div>`;
  }
}

init();
