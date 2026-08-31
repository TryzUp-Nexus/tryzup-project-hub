export function FilterBar(projects) {
  return `<form class="filter-bar" role="search" id="filter-form">
    <label class="search-field"><span class="search-icon" aria-hidden="true">⌕</span><span class="sr-only">Buscar proyectos</span><input name="query" type="search" placeholder="Buscar proyectos…" autocomplete="off"></label>
    <div class="status-tabs" aria-label="Filtrar por estado">
      <label><input type="radio" name="status" value="all" checked><span>Todos</span></label>
      <label><input type="radio" name="status" value="development"><span>En desarrollo</span></label>
      <label><input type="radio" name="status" value="review"><span>En revisión</span></label>
      <label><input type="radio" name="status" value="complete"><span>Completados</span></label>
    </div>
    <label class="sort-field"><span class="sr-only">Ordenar proyectos</span><select name="sort"><option value="recent">Más recientes</option><option value="progress">Mayor avance</option><option value="name">Nombre</option></select></label>
  </form>`;
}
