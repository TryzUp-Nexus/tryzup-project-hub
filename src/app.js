const PROJECTS_URL = new URL("../data/projects.json", import.meta.url);
const LEARNING_URL = new URL("../data/learning.json", import.meta.url);
const STATUS_LABELS = { active: "Activo", development: "En desarrollo", planning: "Planificación", design: "Diseño", research: "Investigación", blocked: "Bloqueado", paused: "Pausado", complete: "Completado" };
const DEFAULT_FILTERS = { query: "", category: "all", status: "all", priority: "all" };
const dateFormatter = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const byId = (id) => document.getElementById(id);
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No fue posible cargar ${url.pathname}`);
  return response.json();
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "Sin fecha" : dateFormatter.format(date);
}

function calculateStats(projects) {
  const known = projects.filter(({ progress }) => Number.isFinite(progress));
  return {
    total: projects.length,
    active: projects.filter(({ status }) => ["active", "development"].includes(status)).length,
    planning: projects.filter(({ status }) => ["planning", "design", "research"].includes(status)).length,
    blocked: projects.filter(({ status }) => status === "blocked").length,
    average: known.length ? Math.round(known.reduce((sum, item) => sum + item.progress, 0) / known.length) : null
  };
}

function filterProjects(projects, filters) {
  const query = filters.query.trim().toLocaleLowerCase("es");
  return projects.filter((project) => {
    const searchable = [project.name, project.description, project.phase, ...(project.technologies || [])].join(" ").toLocaleLowerCase("es");
    return (!query || searchable.includes(query))
      && (filters.category === "all" || project.category === filters.category)
      && (filters.status === "all" || project.status === filters.status)
      && (filters.priority === "all" || project.priority === filters.priority);
  });
}

function SummaryTile(label, value, accent = false) {
  return `<article class="stat-card${accent ? " accent" : "}"><strong>${value ?? "—"}</strong><span>${label}</span></article>`;
}

function StatusBadge(status) {
  return `<span class="badge badge-${status}">${STATUS_LABELS[status] || status}</span>`;
}

function ProgressBar(progress) {
  const defined = Number.isFinite(progress);
  const value = defined ? Math.min(100, Math.max(0, progress)) : 0;
  return `<div class="progress-head"><span>Avance</span><strong>${defined ? `${value}%` : "Por definir"}</strong></div><div class="progress-track" role="progressbar" aria-label="Avance del proyecto" aria-valuemin="0" aria-valuemax="100" ${defined ? `aria-valuenow="${value}"` : "aria-valuetext=\"Por definir\""}><span style="width:${value}%"></span></div>`;
}

function ProjectCard(project) {
  const links = [project.repository && `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub</a>`, project.demo && `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Demo</a>`].filter(Boolean).join("");
  return `<article class="project-card"><div class="card-top"><span class="category">${escapeHtml(project.category)}</span>${StatusBadge(project.status)}</div>
    <h3>${escapeHtml(project.name)}</h3><p class="description">${escapeHtml(project.description)}</p>${ProgressBar(project.progress)}
    <dl class="project-details"><div><dt>Fase</dt><dd>${escapeHtml(project.phase)}</dd></div><div><dt>Prioridad</dt><dd class="priority-${project.priority}">${escapeHtml(project.priority)}</dd></div></dl>
    <div class="technologies">${(project.technologies || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
    <div class="project-note"><small>Último avance · ${formatDate(project.lastUpdate)}</small><p>${escapeHtml(project.lastAchievement)}</p></div>
    <div class="next-action"><small>Siguiente acción</small><p>→ ${escapeHtml(project.nextAction)}</p></div>${links ? `<div class="card-links">${links}</div>` : ""}</article>`;
}

const options = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b, "es")).map((value) => `<option value="${value}">${value}</option>`).join("");

function FilterBar(projects) {
  return `<form class="filter-bar" role="search" id="filter-form"><label class="search-field"><span class="sr-only">Buscar proyectos</span><input name="query" type="search" placeholder="Buscar proyecto o tecnología…" autocomplete="off"></label>
    <label><span class="sr-only">Categoría</span><select name="category"><option value="all">Todas las categorías</option>${options(projects.map((p) => p.category))}</select></label>
    <label><span class="sr-only">Estado</span><select name="status"><option value="all">Todos los estados</option>${options(projects.map((p) => p.status))}</select></label>
    <label><span class="sr-only">Prioridad</span><select name="priority"><option value="all">Todas las prioridades</option>${options(projects.map((p) => p.priority))}</select></label><button type="reset">Limpiar</button></form>`;
}

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
  byId("roadmap").innerHTML = dated.map((project) => `<article><time>${formatDate(project.targetDate)}</time><div><strong>${project.name}</strong><p>${project.nextAction}</p></div></article>`).join("") || "<p class=\"muted\">Próximos hitos por definir.</p>";
}

function renderActivity(projects) {
  const recent = [...projects].sort((a, b) => String(b.lastUpdate || "").localeCompare(String(a.lastUpdate || ""))).slice(0, 5);
  byId("activity").innerHTML = recent.map((project) => `<article><time>${formatDate(project.lastUpdate)}</time><div><strong>${project.name}</strong><p>${project.lastAchievement}</p></div></article>`).join("");
}

function renderLearning(records) {
  byId("learning-grid").innerHTML = records.map((record) => `<article class="learning-card"><div><span class="category">${record.area}</span><strong>${record.progress}%</strong></div><h3>${record.title}</h3><p>${record.evidence}</p><div class="technologies">${record.technologies.map((item) => `<span>${item}</span>`).join("")}</div></article>`).join("");
}

async function init() {
  try {
    const [projects, learning] = await Promise.all([loadJson(PROJECTS_URL), loadJson(LEARNING_URL)]);
    renderStats(projects); renderProjects(projects); renderRoadmap(projects); renderActivity(projects); renderLearning(learning);
    byId("filters").innerHTML = FilterBar(projects);
    const form = byId("filter-form");
    form.addEventListener("input", () => renderProjects(filterProjects(projects, Object.fromEntries(new FormData(form)))));
    form.addEventListener("reset", () => requestAnimationFrame(() => renderProjects(filterProjects(projects, DEFAULT_FILTERS))));
  } catch (error) {
    console.error(error);
    byId("project-grid").innerHTML = `<div class="error-state">No fue posible cargar el panel. Inícialo desde un servidor web e inténtalo nuevamente.</div>`;
  }
}

init();
