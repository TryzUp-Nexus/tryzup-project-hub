const PROJECTS_URL = new URL("../../data/projects.json", import.meta.url);
const LEARNING_URL = new URL("../../data/learning.json", import.meta.url);

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No fue posible cargar ${url.pathname}`);
  return response.json();
}

export const getProjects = () => loadJson(PROJECTS_URL);
export const getLearning = () => loadJson(LEARNING_URL);

export function calculateStats(projects, learning = []) {
  const knownProgress = projects.filter(({ progress }) => Number.isFinite(progress));
  const average = knownProgress.length ? Math.round(knownProgress.reduce((sum, item) => sum + item.progress, 0) / knownProgress.length) : null;
  return {
    active: projects.filter(({ status }) => ["active", "development"].includes(status)).length,
    development: projects.filter(({ status }) => status === "development").length,
    average,
    appliedLearning: learning.filter(({ status }) => status === "applied").length
  };
}
