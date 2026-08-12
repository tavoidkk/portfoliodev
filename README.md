# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## GitHub contribution heatmap

The heatmap on the homepage is rendered from a static snapshot stored in
[`src/data/github.json`](src/data/github.json). This keeps the full
contributions count (public + private) visible for every visitor without
exposing any API token to the client.

- **[`.github/workflows/refresh-contributions.yml`](.github/workflows/refresh-contributions.yml)**
  runs daily at 04:00 UTC (and can be triggered manually with `workflow_dispatch`)
  to regenerate `github.json` and commit the result.
- The workflow reads a repository secret named `GH_CONTRIB_TOKEN` (a GitHub
  Personal Access Token with `read:user` scope). See the repository
  **Settings → Secrets and variables → Actions**.
- To refresh the data locally, run:
  ```sh
  GITHUB_TOKEN=ghp_xxx node scripts/refresh-contributions.mjs
  ```

`GithubHeatmap.astro` always prefers `src/data/github.json` at build time. If
the file is missing (e.g. a fresh clone before the first refresh) and a
`GITHUB_TOKEN` is available in the environment, it falls back to fetching the
GitHub GraphQL API directly.

