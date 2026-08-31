export const DEFAULT_FILTERS = { query: "", category: "all", status: "all", priority: "all" };

export function filterProjects(projects, filters) {
  const query = filters.query.trim().toLocaleLowerCase("es");
  return projects.filter((project) => {
    const searchable = [project.name, project.description, project.phase, ...(project.technologies || [])].join(" ").toLocaleLowerCase("es");
    return (!query || searchable.includes(query))
      && (filters.category === "all" || project.category === filters.category)
      && (filters.status === "all" || project.status === filters.status)
      && (filters.priority === "all" || project.priority === filters.priority);
  });
}

