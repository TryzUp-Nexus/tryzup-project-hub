# TryzUp Project Hub

Modular Project Control Dashboard & Living Portfolio for the TryzUp ecosystem.

## v0.1.0 — Foundation

This first release provides a data-driven dashboard built with HTML5, CSS3, JavaScript ES Modules and JSON. Projects and learning records live outside the interface, so the hub can grow without duplicating markup.

### Features

- Dynamic statistics and reusable project cards
- Search and filters by category, status and priority
- Roadmap, recent activity and learning modules
- Responsive, accessible Obsidian/TryzUp interface
- GitHub Pages deployment through GitHub Actions

## Run locally

ES Modules and JSON requests require an HTTP server. From the project directory, run any static server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Data

- `data/projects.json`: public project records
- `data/learning.json`: learning evidence and applied knowledge

Do not add credentials, private client data or internal documentation. This repository is public.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. In GitHub, configure **Settings → Pages → Source → GitHub Actions**.

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md).

## License

Copyright © TryzUp Nexus. No license has been granted yet.

