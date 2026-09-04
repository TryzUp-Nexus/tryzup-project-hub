const PROJECTS_URL = new URL("../../data/projects.json", import.meta.url);
const LEARNING_URL = new URL("../../data/learning.json", import.meta.url);

async function loadJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No fue posible cargar ${url.pathname}`);
  }

  return response.json();
}

/**
 * Normaliza un proyecto para que la UI pueda consumir
 * tanto el formato legacy como el nuevo contrato de datos.
 */
export function normalizeProject(project = {}) {
  const progressObject =
    project.progress && typeof project.progress === "object" && !Array.isArray(project.progress)
      ? project.progress
      : null;

  const progress = Number.isFinite(project.progress)
    ? project.progress
    : progressObject?.measurable === false
      ? null
      : Number.isFinite(progressObject?.value)
        ? progressObject.value
        : null;

  const phase =
    typeof project.phase === "string"
      ? project.phase
      : (project.phase?.name ?? project.phase?.label ?? "");

  const repository = project.repository ?? project.links?.repository ?? null;

  const demo = project.demo ?? project.links?.demo ?? null;

  const lastUpdate = project.lastUpdate ?? project.dates?.lastUpdate ?? null;

  const targetDate =
    project.targetDate ?? project.dates?.target ?? project.dates?.targetDate ?? null;

  return {
    ...project,

    progress,
    phase,

    repository,
    demo,

    lastUpdate,
    targetDate,
  };
}

export const getProjects = async () => {
  const projects = await loadJson(PROJECTS_URL);

  return projects.map(normalizeProject);
};

export const getLearning = () => loadJson(LEARNING_URL);

export function calculateStats(projects, learning = []) {
  const knownProgress = projects.filter(({ progress }) => Number.isFinite(progress));

  const average = knownProgress.length
    ? Math.round(knownProgress.reduce((sum, item) => sum + item.progress, 0) / knownProgress.length)
    : null;

  return {
    active: projects.filter(({ status }) => ["active", "development"].includes(status)).length,

    development: projects.filter(({ status }) => status === "development").length,

    average,

    appliedLearning: learning.filter(({ status }) => status === "applied").length,
  };
}
