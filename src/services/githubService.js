export async function getPublicRepository(owner, repository) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error("GitHub no está disponible en este momento");
  const data = await response.json();
  return {
    stars: data.stargazers_count,
    issues: data.open_issues_count,
    updatedAt: data.updated_at,
    url: data.html_url,
  };
}
