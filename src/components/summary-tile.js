export function SummaryTile(label, value, detail, iconName) {
  return `
    <article class="stat-card">
      <span class="stat-icon" data-icon="${iconName}"></span>
      <div class="stat-content">
        <span class="stat-label">${label}</span>
        <strong>${value ?? "Por definir"}</strong>
        <small>${detail}</small>
      </div>
    </article>
  `;
}
