const STATUS_LABELS = {
  active: "Activo",
  development: "En desarrollo",
  planning: "Planificación",
  design: "Diseño",
  research: "Investigación",
  blocked: "Bloqueado",
  paused: "Pausado",
  complete: "Completado",
};

export function StatusBadge(status) {
  return `<span class="badge badge-${status}">${STATUS_LABELS[status] || status}</span>`;
}
