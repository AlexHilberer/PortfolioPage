export const SITE_URL = "https://hilberer.dev";

/**
 * Single source of truth for supported languages.
 * Adding a language: add an entry here and create src/locales/<code>.json
 * (plus the matching resume path in src/data/profile.ts).
 * Routing, the language switcher, prerendering, hreflang, sitemap and the
 * build check all derive from this list.
 */
export const LANGUAGES = [
  { code: "de", label: "DE", path: "/", ogLocale: "de_DE" },
  { code: "en", label: "EN", path: "/en/", ogLocale: "en_US" }
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const DEFAULT_LANG: LangCode = "de";
export const LANG_STORAGE_KEY = "site:lang";

export function isLangCode(value: unknown): value is LangCode {
  return LANGUAGES.some((language) => language.code === value);
}

export function getLanguage(code: LangCode) {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
}

/** Resolve the language from a URL pathname such as "/en/" or "/". */
export function langFromPath(pathname: string): LangCode {
  const normalized = pathname.endsWith("/") ? pathname : pathname + "/";
  const match = LANGUAGES.filter((language) => language.path !== "/").find((language) =>
    normalized.startsWith(language.path)
  );
  return match ? match.code : DEFAULT_LANG;
}

export function absoluteUrl(code: LangCode): string {
  return SITE_URL + getLanguage(code).path;
}
