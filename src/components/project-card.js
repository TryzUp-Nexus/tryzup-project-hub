import { ProgressBar } from "./progress-bar.js";
import { StatusBadge } from "./status-badge.js";
import { ProjectVisual } from "./project-visuals.js";

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]
  );

export function ProjectCard(project) {
  const links = [
    project.repository &&
      `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub</a>`,
    project.demo &&
      `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Demo</a>`,
  ]
    .filter(Boolean)
    .join("");

  return `<article class="project-card" data-project-id="${escapeHtml(project.id)}">
    <div class="card-top">
      <div class="project-identity">
        ${ProjectVisual(project)}
        <div class="project-title-block">
          <h3>${escapeHtml(project.name)}</h3>
          <span class="category">${escapeHtml(project.category)}</span>
        </div>
      </div>
      ${StatusBadge(project.status)}
    </div>

    <p class="description">${escapeHtml(project.description)}</p>

    ${ProgressBar(project.progress)}

    <div class="project-meta">
      <span>${escapeHtml(project.phase)}</span>
      <span class="priority priority-${project.priority}">
        Prioridad ${escapeHtml(project.priority)}
      </span>
    </div>

    <div class="technologies">
      ${(project.technologies || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>

    <div class="next-action">
      <small>Próxima acción</small>
      <p>${escapeHtml(project.nextAction)} <span aria-hidden="true">→</span></p>
    </div>

    ${links ? `<div class="card-links">${links}</div>` : ""}
  </article>`;
}
