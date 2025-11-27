# ResumeForge — Resume Builder

Short, polished resume builder with a live preview and PDF export.

This repository contains a React + Vite application used to build and export resumes. It includes a floating toolbar that controls font, sizing and spacing, and a live A4 preview that can be exported to PDF.

## Quick overview
- Frontend: React (v19) + Vite
- Styling: Tailwind CSS
- PDF export: `html2pdf.js`

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (bundled with Node.js) or yarn

## Install
Open a Windows `cmd` (or PowerShell) in the repository root and run:

```cmd
npm install
```

## Run (development)
Start the dev server and open the app in your browser:

```cmd
npm run dev
```

The default Vite console output will show the local URL (typically `http://localhost:5173`).

## Build for production

```cmd
npm run build
```

To preview the built output locally:

```cmd
npm run preview
```

## Lint

```cmd
npm run lint
```

## How to export PDF
- Use the **Export** / **Download PDF** buttons in the UI (top header or toolbar) — both run `html2pdf.js` against the preview element with print settings for A4.

## Layout and styles
Global layout variables and general styles live in `src/index.css`. If you need to make visual adjustments, update the CSS there and restart the dev server to verify changes.

## Troubleshooting
- If spacing doesn't update after editing CSS variables, restart the dev server or clear the browser cache.
- If the toolbar visually overlaps the header, ensure `--header-h` equals the header's real height (the header uses `h-16`).

## Notes for reviewers / employer
- The repo demonstrates UI responsiveness, Tailwind usage, and a client-side PDF export flow.
- To verify the exported PDF, click `Download PDF` — the built-in export uses the same preview DOM.

----
Generated README for testing and review.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
