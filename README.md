# Vijay Manoharan â€” QA Automation Portfolio

A minimalist portfolio with an animated Three.js scene that demonstrates browser, API, and release testing workflows.

## Run locally

```bash
npm ci
npm run dev
```

Run a production build with `npm run build`.

## Publish

The `main` branch deploys automatically to GitHub Pages through `.github/workflows/deploy.yml`.

1. In the repository settings, open **Pages** and set the build source to **GitHub Actions**.
2. Push changes to `main` or start the **Deploy portfolio to GitHub Pages** workflow from the Actions tab.
3. The site URL is <https://autoutilities.github.io/Portfolio/>.

The Vite base path is configured for the `Portfolio` repository in `vite.config.js`.

## Personalize

Before sharing the site publicly, replace the email, LinkedIn, and GitHub placeholders in `src/main.jsx`, add a resume PDF under `public/`, and verify all portfolio details and metrics.

## Stack

React, Vite, Three.js, Lucide, and GitHub Actions.
