import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANGUAGES, OG_IMAGE_PATH, SITE_URL, absoluteUrl } from "../src/i18n/config";
import { locales } from "../src/i18n";
import { exploring } from "../src/data/exploring";
import { projects } from "../src/data/projects";
import { profile } from "../src/data/profile";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors: string[] = [];

function expect(condition: boolean, message: string) {
  if (!condition) errors.push(message);
}

function flatten(source: unknown, prefix = ""): string[] {
  if (source && typeof source === "object" && !Array.isArray(source)) {
    return Object.entries(source).flatMap(([key, value]) => flatten(value, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

function get(source: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((value, part) => (value as Record<string, unknown> | undefined)?.[part], source);
}

// 1. Locale key parity and the dynamic keys built in the components.
const referenceKeys = new Set(flatten(locales[LANGUAGES[0].code]));
for (const { code } of LANGUAGES) {
  const keys = new Set(flatten(locales[code]));
  for (const key of referenceKeys) expect(keys.has(key), `locales/${code}.json is missing "${key}"`);
  for (const key of keys) expect(referenceKeys.has(key), `locales/${code}.json has extra key "${key}"`);
  for (const key of keys) expect(String(get(locales[code], key)).trim() !== "", `locales/${code}.json "${key}" is empty`);
  expect(Boolean(profile.resume[code]), `profile.resume is missing "${code}"`);

  const dynamic = [
    ...projects.flatMap((p) => [
      `projects.${p.id}.description`,
      ...p.highlights.map((h) => `projects.${p.id}.highlights.${h}`),
      `projects.environments.${p.environment}`
    ]),
    ...exploring.flatMap((e) => [`about.exploring.${e.id}.title`, `about.exploring.${e.id}.description`])
  ];
  for (const key of dynamic) expect(keys.has(key), `locales/${code}.json is missing dynamic key "${key}"`);
}
for (const project of projects) {
  expect(project.tech.length <= 5, `Project "${project.id}" has more than five technology tags.`);
}

// 2. Prerendered pages.
for (const { code, path: urlPath } of LANGUAGES) {
  const file = path.join("dist", urlPath, "index.html");
  const page = await readFile(path.join(rootDir, file), "utf8");
  const meta = locales[code].meta;
  const required = [
    `<html lang="${code}">`,
    `<link rel="canonical" href="${absoluteUrl(code)}" />`,
    'name="description"',
    "application/ld+json",
    ...LANGUAGES.map((l) => `hreflang="${l.code}"`),
    'hreflang="x-default"',
    locales[code].hero.location,
    'class="project-entry"',
    'class="exploring-item"',
    "cert-card",
    `href="${profile.resume[code]}"`,
    `<meta property="og:image" content="${SITE_URL + OG_IMAGE_PATH}" />`,
    `<meta property="og:site_name"`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="theme-color"`,
    `rel="apple-touch-icon"`,
    `href="/favicon.ico"`,
    `max-image-preview:large`,
    `"alternateName":["hilberer.dev"]`,
    `rel="preload" href="/fonts/`
  ];
  for (const text of required) expect(page.includes(text), `${file} is missing: ${text}`);
  expect(page.includes(`<title>${meta.title.replaceAll("&", "&amp;")}</title>`), `${file} has the wrong <title>`);
  expect(!page.includes("fonts.googleapis.com"), `${file} still loads Google Fonts`);
  expect(!page.includes("<!--app-"), `${file} contains an unreplaced template placeholder`);
  expect(!/id="root"><\/div>/.test(page), `${file} has an empty root (not prerendered)`);
}

// 3. Static assets and the 404 page.
for (const asset of ["fonts/inter-latin-wght.woff2", "fonts/jetbrains-mono-latin-wght.woff2", OG_IMAGE_PATH.slice(1), "apple-touch-icon.png", "favicon.svg", "favicon.ico"]) {
  await access(path.join(rootDir, "dist", asset)).catch(() => errors.push(`dist/${asset} is missing`));
}
const notFound = await readFile(path.join(rootDir, "dist/404.html"), "utf8");
expect(notFound.includes('name="robots" content="noindex"'), "404.html is not noindex");
expect(notFound.includes("data-not-found"), "404.html is missing the data-not-found marker");
expect(notFound.includes('type="module"'), "404.html does not load the app script (language detection)");
expect(!notFound.includes('rel="canonical"'), "404.html must not have a canonical URL");
expect(notFound.includes('class="nav"') && notFound.includes("lang-toggle"), "404.html is missing the header / language switcher");
expect(notFound.includes(locales[LANGUAGES[0].code].notFound.heading), "404.html is missing the default-language text");
for (const { path: langPath } of LANGUAGES) {
  expect(notFound.includes(`href="${langPath}"`), `404.html is missing a link to ${langPath}`);
}

const sitemap = await readFile(path.join(rootDir, "dist/sitemap.xml"), "utf8");
for (const { code } of LANGUAGES) {
  expect(sitemap.includes(absoluteUrl(code)), `sitemap.xml is missing ${absoluteUrl(code)}`);
}
expect(sitemap.includes(SITE_URL), "sitemap.xml has no site URL");

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Build check passed.");
}
