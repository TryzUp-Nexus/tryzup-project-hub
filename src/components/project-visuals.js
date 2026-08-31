const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]
  );

const visualMap = {
  "project-hub": {
    type: "image",
    src: "./assets/img/brand/tryzup-mark.png",
    className: "visual-tryzup",
  },

  tryzup: {
    type: "image",
    src: "./assets/img/brand/tryzup-mark.png",
    className: "visual-tryzup",
  },

  "legado-uno": {
    type: "svg",
    className: "visual-legado",
    svg: `
      <svg class="project-visual-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 3 7 9.5h4.3V21" />
        <path d="M11.3 21h4.5" />
      </svg>
    `,
  },

  "tryzup-market": {
    type: "svg",
    className: "visual-market",
    svg: `
      <svg class="project-visual-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8h14l-1 12H6z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        <path d="M9 13h6" />
      </svg>
    `,
  },

  "cv-platform": {
    type: "svg",
    className: "visual-cv",
    svg: `
      <svg class="project-visual-svg" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8" cy="11" r="2" />
        <path d="M5.5 16c.6-1.8 4.4-1.8 5 0" />
        <path d="M13 10h5M13 14h5" />
      </svg>
    `,
  },

  "arca-nexus": {
    type: "svg",
    className: "visual-arca",
    svg: `
      <svg class="project-visual-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2 8 4.7v10.6L12 22l-8-4.7V6.7z" />
        <path d="m4 6.7 8 4.7 8-4.7" />
        <path d="M12 11.4V22" />
      </svg>
    `,
  },
};

export function ProjectVisual(project, size = "card") {
  const visual = visualMap[project.id];
  const name = escapeHtml(project.name);

  if (!visual) {
    return `
      <span class="project-visual project-visual-${size} visual-fallback" aria-hidden="true">
        ${escapeHtml(project.name.charAt(0).toUpperCase())}
      </span>
    `;
  }

  if (visual.type === "image") {
    return `
      <span class="project-visual project-visual-${size} ${visual.className}" aria-hidden="true">
        <img src="${visual.src}" alt="" />
      </span>
    `;
  }

  return `
    <span
      class="project-visual project-visual-${size} ${visual.className}"
      aria-label="${name}"
      role="img"
    >
      ${visual.svg}
    </span>
  `;
}
