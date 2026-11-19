import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { LANGUAGES, SITE_URL, absoluteUrl, type LangCode } from "../src/i18n/config";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(rootDir, "dist-server");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const escapeJson = (value: unknown) => JSON.stringify(value).replaceAll("<", "\\u003c");

type ServerModule = typeof import("../src/entry-server");

function buildHead(mod: ServerModule, lang: LangCode): string {
  const meta = mod.locales[lang].meta;
  const url = absoluteUrl(lang);
  const defaultLang = LANGUAGES[0].code;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        name: mod.profile.name,
        url: SITE_URL + "/",
        inLanguage: lang
      },
      {
        "@type": "Person",
        "@id": SITE_URL + "/#alexander-hilberer",
        name: mod.profile.name,
        jobTitle: meta.jobTitle,
        url: SITE_URL + "/",
        sameAs: [mod.profile.githubUrl, mod.profile.linkedinUrl],
        knowsAbout: meta.knowsAbout
      }
    ]
  };

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGUAGES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${absoluteUrl(l.code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(defaultLang)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:locale" content="${lang}" />`,
    `<script type="application/ld+json">${escapeJson(structuredData)}</script>`
  ].join("\n  ");
}

async function prerender() {
  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  const mod = (await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href)) as ServerModule;

  for (const language of LANGUAGES) {
    const html = template
      .replace(/<html lang="[^"]*">/, `<html lang="${language.code}">`)
      .replace("<!--app-head-->", () => buildHead(mod, language.code))
      .replace("<!--app-html-->", () => mod.render(language.code));

    const outDir = path.join(distDir, language.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
  }

  await writeFile(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );
  await writeFile(
    path.join(distDir, "sitemap.xml"),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
      ...LANGUAGES.map((l) =>
        [
          "  <url>",
          `    <loc>${absoluteUrl(l.code)}</loc>`,
          ...LANGUAGES.map(
            (alt) => `    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${absoluteUrl(alt.code)}" />`
          ),
          "  </url>"
        ].join("\n")
      ),
      "</urlset>"
    ].join("\n") + "\n"
  );

  // GitHub Pages serves 404.html for unknown paths; reuse the default-language page.
  await writeFile(path.join(distDir, "404.html"), await readFile(path.join(distDir, "index.html"), "utf8"));

  await rm(serverDir, { recursive: true, force: true });
}

prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
