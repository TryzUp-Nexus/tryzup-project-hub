import { ProgressBar } from "./progress-bar.js";
import { StatusBadge } from "./status-badge.js";
import { formatDate } from "../utils/dates.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

export function ProjectCard(project) {
  const links = [project.repository && `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub</a>`, project.demo && `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Demo</a>`].filter(Boolean).join("");
  return `<article class="project-card">
    <div class="card-top"><span class="category">${escapeHtml(project.category)}</span>${StatusBadge(project.status)}</div>
    <h3>${escapeHtml(project.name)}</h3><p class="description">${escapeHtml(project.description)}</p>
    ${ProgressBar(project.progress)}
    <dl class="project-details"><div><dt>Fase</dt><dd>${escapeHtml(project.phase)}</dd></div><div><dt>Prioridad</dt><dd class="priority-${project.priority}">${escapeHtml(project.priority)}</dd></div></dl>
    <div class="technologies">${(project.technologies || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
    <div class="project-note"><small>Último avance · ${formatDate(project.lastUpdate)}</small><p>${escapeHtml(project.lastAchievement)}</p></div>
    <div class="next-action"><small>Siguiente acción</small><p>→ ${escapeHtml(project.nextAction)}</p></div>
    ${links ? `<div class="card-links">${links}</div>` : ""}
  </article>`;
}

