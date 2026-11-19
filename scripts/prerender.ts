import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { LANGUAGES, OG_IMAGE_PATH, OG_IMAGE_SIZE, SITE_URL, absoluteUrl, getLanguage, type LangCode } from "../src/i18n/config";

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
  const image = SITE_URL + OG_IMAGE_PATH;
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
    `<meta property="og:site_name" content="${escapeHtml(mod.profile.name)}" />`,
    `<meta property="og:locale" content="${getLanguage(lang).ogLocale}" />`,
    ...LANGUAGES.filter((l) => l.code !== lang).map(
      (l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`
    ),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_SIZE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_SIZE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<script type="application/ld+json">${escapeJson(structuredData)}</script>`
  ].join("\n  ");
}

function buildNotFound(template: string, mod: ServerModule): string {
  const defaultLang = LANGUAGES[0].code;
  const head = [
    `<title>${escapeHtml(mod.locales[defaultLang].notFound.title)}</title>`,
    `<meta name="robots" content="noindex" />`
  ].join("\n  ");
  const blocks = LANGUAGES.map((l) => {
    const text = mod.locales[l.code].notFound;
    return [
      `<div lang="${l.code}" style="margin-bottom: 40px">`,
      `<h1 class="hero__name">${escapeHtml(text.heading)}</h1>`,
      `<p class="hero__tagline">${escapeHtml(text.text)}</p>`,
      `<div class="hero__actions"><a class="button button--primary" href="${l.path}" hreflang="${l.code}">${escapeHtml(text.home)}</a></div>`,
      `</div>`
    ].join("");
  }).join("");

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${defaultLang}">`)
    .replace("<!--app-head-->", () => head)
    .replace("<!--app-html-->", () => `<main><section class="hero"><div class="container">${blocks}</div></section></main>`)
    .replace(/<script type="module"[^>]*><\/script>\s*/g, "")
    .replace(/<link rel="modulepreload"[^>]*>\s*/g, "");
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

  // GitHub Pages serves 404.html (with a 404 status) for unknown paths.
  await writeFile(path.join(distDir, "404.html"), buildNotFound(template, mod));

  await rm(serverDir, { recursive: true, force: true });
}

prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
