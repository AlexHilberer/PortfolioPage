# Portfolio Site Contributor Guide

## Overview

This repository is Alexander Hilberer's portfolio site. It is a React + TypeScript app built with Vite, translated with `react-i18next`, and prerendered per language into static HTML for GitHub Pages (German at `/`, English at `/en/`).

## Repository Map

- `index.html` is the Vite template. The prerender step replaces `<!--app-head-->` (title, SEO tags, JSON-LD) and `<!--app-html-->` (rendered app).
- `src/main.tsx` hydrates the prerendered page; `src/entry-server.tsx` exports `render(lang)` for the prerender.
- `src/i18n/config.ts` holds `LANGUAGES`, the single source of truth for languages and URL paths. `src/i18n/index.ts` creates the i18next instances.
- `src/locales/<code>.json` contain all language-dependent copy; German is the default.
- `src/data/` holds language-neutral content (profile, exploring items, projects, certifications).
- `src/components/` contains the UI: `Header`, `LanguageSwitcher`, `Sections` (Hero, About, Work, Projects, Credentials, Contact, Footer) and `Icons`.
- `src/styles/` is imported in this order: `base.css`, `theme.css`, `layout.css`, `components.css`.
- `public/` is copied to the site root: `favicon.svg` and `assets/resume/` (language-specific PDFs).
- `scripts/prerender.ts` writes `dist/index.html`, `dist/en/index.html` (one per `LANGUAGES` entry), `sitemap.xml`, `robots.txt` and `404.html`. `scripts/check-build.ts` verifies locale parity and the generated output.
- `.github/workflows/deploy-pages.yml` builds, checks and deploys `dist/` to GitHub Pages.

## Editing Rules

- Edit source files only. Never edit `dist/` or `dist-server/`; they are generated, ignored by Git and replaced on every build.
- Keep components server-render safe: no `window`/`document`/`localStorage` access during render, only in effects or event handlers. The prerendered HTML must match the first client render, or hydration will warn.
- Do not hard-code language-dependent copy in components. Use `t("...")` with a key from `src/locales/*.json`. Proper nouns, technology names, certification names and dates stay in `src/data/`.
- Use React elements and JSX, not `dangerouslySetInnerHTML`. Icons live in `src/components/Icons.tsx`.
- Keep language-switcher items as real links with `hreflang`, so every language stays reachable without JavaScript.
- Preserve `target="_blank" rel="noopener noreferrer"` on external links.
- Keep responsive behaviour and keyboard accessibility intact; interactive controls need correct semantics and ARIA state.
- Reuse existing CSS variables, classes and component patterns before creating new ones. Put foundational rules in `base.css` or `theme.css`, structural layout in `layout.css`, and reusable or section components in `components.css`.
- Keep the output contract: each language is generated at `dist/<LANGUAGES.path>/index.html`, with the default language at `dist/index.html`.

## Content Changes

### Projects

Add records to `src/data/projects.ts` with `id`, `title`, `link`, `environment` (`"onprem" | "azure" | "gcp"`, which must exist in `Icons.tsx` and in `projects.environments` in every locale), `highlights` (three keys), `tech` and `order`. Add `projects.<id>.description` and `projects.<id>.highlights.<key>` to every locale file. Projects are equal-weight entries: do not add project-specific markup or a featured flag.

- Use at most five technology tags per project (the check enforces this). Pick the technologies that convey the main architectural decisions, not every dependency.
- Describe personal projects as reference implementations or demonstrations where appropriate. Do not imply production scale, enterprise readiness, customer use or operational guarantees that the repository cannot demonstrate.

### Exploring and Work

Add "exploring" items to `src/data/exploring.ts` (`id`, `icon` from `Icons.tsx`, `order`) with matching `about.exploring.<id>.{title,description}` in every locale file. The Work section ("Where I come from") is plain text under `work.*` in the locale files; the résumé link in it uses `profile.resume[lang]`.

### Certifications

Add records to `src/data/certifications.ts` following the `Certification` type: unique `id`, `code`, `name`, `issuer`, `issuerIcon` (`azure` or `gcp`), `status` (`active` or `retired`), `group` (`primary` or `supporting`), `verifyUrl` and `order`. Active supporting and retired credentials each render in their own collapsed section; the retired section is visually muted.

### Translations

- Keep the key structure identical in every `src/locales/*.json`. `npm run check` fails on missing, extra or empty keys, and on missing project or exploring keys.
- To add a language: add it to `LANGUAGES` (`src/i18n/config.ts`), create `src/locales/<code>.json`, register it in `src/i18n/index.ts`, add `resume.<code>` in `src/data/profile.ts` and the PDF in `public/assets/resume/`.
- Keep `meta.title`, `meta.description`, `meta.jobTitle` and `meta.knowsAbout` current; the prerender uses them for the title, description, Open Graph tags and JSON-LD.

## Verification

- Use Node.js 20.19 or later (CI uses 22). Run `npm ci`, `npm run build` and `npm run check` after every change that affects the site; `npm run build` includes the type-check.
- Run `npm run dev` or `npm run preview` and check both `/` and `/en/`: no console errors or hydration warnings, and the language switcher navigates between the pages.
- Check desktop and a narrow mobile viewport, including the navigation toggle.
- Confirm new external and resume links resolve to the intended target.
- For CSS or markup changes, verify keyboard focus remains visible. Inspect the generated `dist/` output, not only the source.

## Deployment

GitHub Pages is deployed through the custom GitHub Actions workflow, not from a branch directory. The workflow runs `npm ci`, `npm run build` and `npm run check`, then uploads `dist/`. In GitHub, Pages must use **GitHub Actions** as its publishing source.

The custom domain remains configured in the GitHub Pages settings. Do not rely on the root `CNAME` file being published, because the build artifact intentionally excludes it.
