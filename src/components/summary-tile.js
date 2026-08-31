export function SummaryTile(label, value, detail) {
  return `<article class="stat-card"><span>${label}</span><strong>${value ?? "Por definir"}</strong><small>${detail}</small></article>`;
}
