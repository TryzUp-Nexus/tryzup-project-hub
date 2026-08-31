import { getProjects, getLearning, calculateStats } from "./services/projectService.js";
import { SummaryTile } from "./components/summary-tile.js";
import { ProjectCard } from "./components/project-card.js";
import { FilterBar } from "./components/filter-bar.js";
import { DEFAULT_FILTERS, filterProjects } from "./utils/filters.js";
import { formatDate, sortByDateDescending } from "./utils/dates.js";

const byId = (id) => document.getElementById(id);

function renderStats(projects) {
  const stats = calculateStats(projects);
  byId("stats").innerHTML = [SummaryTile("Proyectos", stats.total), SummaryTile("Activos", stats.active, true), SummaryTile("En planificación", stats.planning), SummaryTile("Bloqueados", stats.blocked), SummaryTile("Avance medido", stats.average === null ? "—" : `${stats.average}%`)].join("");
}

function renderProjects(projects) {
  byId("project-grid").innerHTML = projects.map(ProjectCard).join("");
  byId("result-count").textContent = `${projects.length} proyecto${projects.length === 1 ? "" : "s"}`;
  byId("empty-state").hidden = projects.length !== 0;
}

function renderRoadmap(projects) {
  const dated = projects.filter((project) => project.targetDate).sort((a, b) => a.targetDate.localeCompare(b.targetDate));
  byId("roadmap").innerHTML = dated.length ? dated.map((project) => `<article><time>${formatDate(project.targetDate)}</time><div><strong>${project.name}</strong><p>${project.nextAction}</p></div></article>`).join("") : "<p class=\"muted\">Próximos hitos por definir.</p>";
}

function renderActivity(projects) {
  byId("activity").innerHTML = sortByDateDescending(projects).slice(0, 5).map((project) => `<article><time>${formatDate(project.lastUpdate)}</time><div><strong>${project.name}</strong><p>${project.lastAchievement}</p></div></article>`).join("");
}

function renderLearning(records) {
  byId("learning-grid").innerHTML = records.map((record) => `<article class="learning-card"><div><span class="category">${record.area}</span><strong>${record.progress}%</strong></div><h3>${record.title}</h3><p>${record.evidence}</p><div class="technologies">${record.technologies.map((item) => `<span>${item}</span>`).join("")}</div></article>`).join("");
}

async function init() {
  try {
    const [projects, learning] = await Promise.all([getProjects(), getLearning()]);
    renderStats(projects); renderProjects(projects); renderRoadmap(projects); renderActivity(projects); renderLearning(learning);
    byId("filters").innerHTML = FilterBar(projects);
    const form = byId("filter-form");
    const applyFilters = () => renderProjects(filterProjects(projects, Object.fromEntries(new FormData(form))));
    form.addEventListener("input", applyFilters);
    form.addEventListener("reset", () => requestAnimationFrame(() => renderProjects(filterProjects(projects, DEFAULT_FILTERS))));
  } catch (error) {
    console.error(error);
    byId("project-grid").innerHTML = `<div class="error-state">No fue posible cargar el panel. Inícialo desde un servidor web e inténtalo nuevamente.</div>`;
  }
}

init();
