# TiQology SPA

This repository contains the standalone TiQology SuperApp frontend (SPA) powered by Vite, React, TypeScript, TailwindCSS, DaisyUI, Zustand, and React Router.

## Live Demo

🚀 **[View Live Demo](https://mrallgoodwilson.github.io/TiQology-spa/)**

The application is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. The deployment workflow builds the Vite application and publishes the production bundle to GitHub Pages.

**Deployment Notes:**
- The app is configured with `base: '/TiQology-spa/'` in `vite.config.ts` for correct routing on GitHub Pages
- Automatic deployments run on every push to `main` branch
- Manual deployments can be triggered via the Actions tab
- The workflow uses Node LTS, `npm ci` for reproducible builds, and Vite for optimized production builds

## Quick Start

Navigate to the `/tiqology-spa` directory and follow the instructions in its README:

```bash
cd tiqology-spa
npm install
npm run dev
```

See the [SPA README](./tiqology-spa/README.md) for detailed documentation.

## Repository Structure

- `/tiqology-spa` - The main SPA application
  - Built with Vite + React + TypeScript
  - Styled with TailwindCSS and DaisyUI
  - State management with Zustand
  - Routing with React Router
