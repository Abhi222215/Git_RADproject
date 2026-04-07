# Copilot instructions (MT Project)

## Project snapshot
- **Stack**: Vite + React (JS/JSX), ESM (`"type": "module"`).
- **Entry**: `index.html` loads `src/main.jsx` → `src/App.jsx`.
- **UI structure**: page-level composition in `src/App.jsx`, components under `src/component/`.
- **Styling**: plain CSS files (global `src/index.css`, plus per-component CSS like `src/component/Hero/Hero.css`).

## How to run
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Linting
- No `lint` script is defined in `package.json`.
- Use: `npx eslint .` (repo uses ESLint flat config in `eslint.config.js`).

## Conventions to follow in changes
- **Keep edits minimal and consistent** with existing patterns (functional components, CSS alongside components).
- **Components**
  - Prefer one component per file.
  - Keep component folders and imports consistent with existing layout, e.g. `src/component/Hero/Hero.jsx` + `Hero.css`.
  - Existing filenames are mixed-case (e.g. `footer.jsx`, `login.jsx`). Don’t rename files just for casing unless explicitly requested.
- **Routing**
  - `react-router-dom` is installed but not currently wired up.
  - Don’t introduce routing unless a task explicitly asks for it.
- **Styling / CSS scope**
  - Avoid adding new global CSS unless necessary.
  - Prefer updating the component’s own CSS file when changing that component.
  - Watch for duplicate selectors across `src/App.css`, `src/index.css`, and component CSS (e.g. `.navbar`, `.btn`, `.hero`) to prevent regressions.
- **Assets**
  - Images/icons live in `src/assets/` and are imported into components.

## Common pitfalls (repo-specific)
- `index.html` currently has two `<title>` tags; don’t add more head tags unless required.
- CSS selector casing inconsistencies exist (e.g. `.Underline` vs `.underline`, `forgot-password` vs `forget_password` usage). When fixing UI bugs, align classNames and CSS selectors carefully.

## What to update when you change things
- If you add/change a script: update `package.json`.
- If you change component markup: update its CSS file in the same folder.
- If you introduce a new dependency: keep it minimal and justify it in the PR/commit message.

## Quick pointers for agents
- Prefer searching for existing CSS class usage before renaming.
- Run `npm run build` after non-trivial UI changes to catch import/path issues.
