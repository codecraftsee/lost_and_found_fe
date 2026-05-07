# Lost and Found - Frontend

## Project Overview
A Lost and Found web application frontend built with Angular 21 and Tailwind CSS 4.

## Tech Stack
- **Framework:** Angular 21.2 (standalone components, signals)
- **Styling:** Tailwind CSS 4 via PostCSS
- **Testing:** Vitest with jsdom
- **Formatting:** Prettier (100 char width, single quotes, angular HTML parser)
- **Language:** TypeScript 5.9 (strict mode)
- **Package Manager:** npm

## Commands
- `npm start` — start dev server
- `npm run build` — production build
- `npm test` — run tests (Vitest)
- `ng generate component <path>` — generate a component (defaults: standalone, no styles, no tests)

## Project Structure
```
src/app/
  features/          # Feature modules organized by domain
    auth/pages/      # Auth pages: login, register, reset-password
    home/page/       # Home page
  layouts/           # Layout wrapper components (e.g. auth-layout)
  shared/
    components/      # Shared smart components (e.g. navbar)
    ui/              # Reusable UI primitives (button, input)
```

## Conventions
- **Standalone components only** — no NgModules
- **No component styles** — all styling via Tailwind utility classes in templates
- **No test files generated** — tests skipped in schematics config
- **Page naming:** feature pages use `.page.ts` / `.page.html` suffix
- **UI components:** shared primitives live in `shared/ui/`, accept configuration via `@Input()` properties with variant patterns (e.g. `variant: 'primary' | 'secondary'`)
- **Layouts:** route-level layout wrappers live in `layouts/`, use `<router-outlet>` for child content
- **Templates:** separate `.html` files (not inline templates)
- **Routing:** flat route config in `app.routes.ts`, nested children under layout components
- **Imports:** components declare their dependencies in the `imports` array (standalone component pattern)

## Code Style
- 2-space indentation
- Single quotes in TypeScript
- Prettier handles formatting — do not manually format
- Prefix component selectors with `app-`
