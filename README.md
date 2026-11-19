# Portfolio Site

Portfolio page for Alexander Hilberer, built with React, TypeScript and Vite. `react-i18next` handles the translations. A build step prerenders one static HTML page per language for GitHub Pages, so crawlers get the full content without running JavaScript and React hydrates it in the browser.

## Structure

```
index.html                # Vite template with <!--app-head--> / <!--app-html--> placeholders
public/                   # copied as-is: favicon, apple-touch-icon, og-image-2.png, fonts/, assets/resume/*.pdf
src/
  main.tsx                # client entry: hydrates the prerendered page
  entry-server.tsx        # render(lang) used by the prerender step
  App.tsx                 # page composition
  components/             # Header, LanguageSwitcher, Sections (Hero, About, ...), Icons
  i18n/config.ts          # LANGUAGES: the single list of supported languages
  i18n/index.ts           # i18next setup (typed keys, SSR-safe instances)
  locales/{de,en}.json    # all language-dependent copy (de is the default)
  data/                   # language-neutral content: profile, exploring, projects, certifications
  styles/                 # base -> theme -> layout -> components
scripts/prerender.ts      # writes dist/index.html, dist/en/index.html, sitemap.xml, robots.txt, 404.html
scripts/check-build.ts    # checks locale parity and the generated pages
.github/workflows/        # builds, checks and deploys dist/ to GitHub Pages
```

## Languages

German is published at `/` and English at `/en/`. The language switcher consists of real links, and the last choice is remembered. Visitors who chose another language are sent to it when they open `/`.

`LANGUAGES` in `src/i18n/config.ts` drives routing, the switcher, prerendering, hreflang, the sitemap and the build check.

### Add a language

1. Add an entry to `LANGUAGES` in `src/i18n/config.ts` (code, switcher label, URL path, e.g. `{ code: "fr", label: "FR", path: "/fr/" }`).
2. Copy `src/locales/de.json` to `src/locales/<code>.json` and translate it.
3. Register it in `src/i18n/index.ts` (`locales` and `resources`) and add `resume.<code>` in `src/data/profile.ts`, plus the PDF in `public/assets/resume/`.
4. Run `npm run build && npm run check`. The check fails when keys differ between locales or a resume path is missing.

## Add content

- **Project:** add an object to `src/data/projects.ts` (`id`, `title`, `link`, `environment` of `"onprem" | "azure" | "gcp"`, three `highlights`, at most five `tech` tags, `order`), then add `projects.<id>.description` and `projects.<id>.highlights.<key>` to **every** locale file.
- **"Exploring" item:** add `{ id, icon, order }` to `src/data/exploring.ts` (`icon` must exist in `src/components/Icons.tsx`) and `about.exploring.<id>.{title,description}` to every locale file.
- **Work / background text:** `work.*` in the locale files is plain text, so edit it there when your situation changes.
- **Certification:** add a record to `src/data/certifications.ts` (see the `Certification` type). Certification names and codes are proper nouns and are not translated.

## Develop and build

Use Node.js 20.19 or later (CI uses 22):

```bash
npm ci
npm run dev        # Vite dev server
npm run build      # type-check, client build, server build, prerender into dist/
npm run check      # locale parity and generated-page checks
npm run preview    # serve dist/ locally
```

`dist/` and `dist-server/` are generated and ignored by Git.

## Deploy

In GitHub, set **Settings → Pages → Source** to **GitHub Actions**. Pushing to `main` runs `.github/workflows/deploy-pages.yml`: `npm ci`, `npm run build`, `npm run check`, then it uploads and deploys `dist/`. Pull requests run the build and check but do not deploy.

Keep the custom domain configured in the GitHub Pages settings. The root `CNAME` file is not part of the artifact.

## SEO output

The build produces complete German and English pages with per-language titles, descriptions, canonical URLs, Open Graph tags, hreflang links and Person/WebSite JSON-LD, plus `robots.txt`, `sitemap.xml` (with hreflang alternates) and a standalone bilingual `404.html` (`noindex`). Pages carry Open Graph and Twitter card tags with a share image (`public/og-image-2.png`, 1200x630).

## Fonts and share image

Inter and JetBrains Mono are self-hosted as Latin-subset variable WOFF2 files in `public/fonts/` (SIL OFL, licenses alongside), declared in `src/styles/theme.css` and preloaded from `index.html`. There is no request to Google Fonts. `public/og-image-2.png` and `public/apple-touch-icon.png` are static images; replace them to change link previews or the home-screen icon. Their alt text is `meta.ogImageAlt` in the locale files.
