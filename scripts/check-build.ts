import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANGUAGES, SITE_URL, absoluteUrl } from "../src/i18n/config";
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
    `href="${profile.resume[code]}"`
  ];
  for (const text of required) expect(page.includes(text), `${file} is missing: ${text}`);
  expect(page.includes(`<title>${meta.title.replaceAll("&", "&amp;")}</title>`), `${file} has the wrong <title>`);
  expect(!page.includes("<!--app-"), `${file} contains an unreplaced template placeholder`);
  expect(!/id="root"><\/div>/.test(page), `${file} has an empty root (not prerendered)`);
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
