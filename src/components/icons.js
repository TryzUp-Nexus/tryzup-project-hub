const iconPaths = {
  dashboard: `
    <rect x="3" y="3" width="7" height="7" rx="1.25" />
    <rect x="14" y="3" width="7" height="7" rx="1.25" />
    <rect x="3" y="14" width="7" height="7" rx="1.25" />
    <rect x="14" y="14" width="7" height="7" rx="1.25" />
  `,
  home: `
    <path d="M3.5 11.5 12 4l8.5 7.5" />
    <path d="M5.5 10.5V20h13v-9.5" />
    <path d="M9.5 20v-6h5v6" />
  `,
  projects: `
    <path d="M3 7h6.8l2.1 2H21v10H3z" />
    <path d="M3 7V5h6.8l2.1 2" />
  `,
  roadmap: `
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 2v4M16 2v4M4 9h16" />
    <path d="M8 13h3M8 17h6" />
  `,
  activity: `
    <path d="M4 6h16" />
    <path d="M4 12h10" />
    <path d="M4 18h7" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="15" cy="18" r="2" />
  `,
  learning: `
    <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22z" />
    <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z" />
  `,
  resources: `
    <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9z" />
    <path d="m4 6.5 8 4.5 8-4.5" />
    <path d="M12 11v9" />
  `,
  notes: `
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  `,
  template: `
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 9h16M10 9v11" />
  `,
  code: `
    <path d="m8 8-5 4 5 4" />
    <path d="m16 8 5 4-5 4" />
    <path d="m14 4-4 16" />
  `,
  link: `
    <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1" />
  `,
  journal: `
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M9 3v18M12 8h4M12 12h4" />
  `,
  settings: `
    <circle cx="12" cy="12" r="3" />
    <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.6h-4L10.4 6A7 7 0 0 0 8 7.1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1A7 7 0 0 0 10.4 18l.3 2.6h4L15 18a7 7 0 0 0 1.5-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z" />
  `,
  help: `
    <circle cx="12" cy="12" r="9" />
    <path d="M9.8 9a2.5 2.5 0 1 1 3.7 2.2c-1 .6-1.5 1.1-1.5 2.3" />
    <path d="M12 17h.01" />
  `,
  bell: `
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  `,
  menu: `<path d="M4 7h16M4 12h16M4 17h16" />`,
  folder: `
    <path d="M3 7h6.8l2.1 2H21v10H3z" />
    <path d="M3 7V5h6.8l2.1 2" />
  `,
  progress: `<path d="M4 19V10M10 19V6M16 19v-7M22 19H2" />`,
  graduation: `
    <path d="m2 9 10-5 10 5-10 5z" />
    <path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5" />
    <path d="M22 9v6" />
  `,
  rocket: `
    <path d="M14 4c3-2 5-2 6-2 0 1 0 3-2 6l-5 5-5-5z" />
    <path d="M8 8 4 9l-2 4 6-1" />
    <path d="m13 13-1 6 4-2 1-4" />
    <circle cx="15.5" cy="6.5" r="1.5" />
    <path d="M7 17c-2 0-3 1-3 3 2 0 3-1 3-3z" />
  `,
  arrow: `
    <path d="M5 12h14" />
    <path d="m14 7 5 5-5 5" />
  `,
};

export function icon(name, className = "") {
  const paths = iconPaths[name];
  if (!paths) return "";

  return `
    <svg
      class="ui-icon ${className}"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      ${paths}
    </svg>
  `;
}

export function mountIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
}
