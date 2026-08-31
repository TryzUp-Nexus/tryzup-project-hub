export function SummaryTile(label, value, accent = false) {
  return `<article class="stat-card${accent ? " accent" : "}"><strong>${value ?? "—"}</strong><span>${label}</span></article>`;
}

