const optionList = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b, "es")).map((value) => `<option value="${value}">${value}</option>`).join("");

export function FilterBar(projects) {
  return `<form class="filter-bar" role="search" id="filter-form">
    <label class="search-field"><span class="sr-only">Buscar proyectos</span><input name="query" type="search" placeholder="Buscar proyecto o tecnología…" autocomplete="off"></label>
    <label><span class="sr-only">Categoría</span><select name="category"><option value="all">Todas las categorías</option>${optionList(projects.map((p) => p.category))}</select></label>
    <label><span class="sr-only">Estado</span><select name="status"><option value="all">Todos los estados</option>${optionList(projects.map((p) => p.status))}</select></label>
    <label><span class="sr-only">Prioridad</span><select name="priority"><option value="all">Todas las prioridades</option>${optionList(projects.map((p) => p.priority))}</select></label>
    <button type="reset">Limpiar</button>
  </form>`;
}

