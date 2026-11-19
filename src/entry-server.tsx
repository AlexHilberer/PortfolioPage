import { renderToString } from "react-dom/server";
import { App, NotFoundApp } from "./App";
import { createI18n, locales } from "./i18n";
import type { LangCode } from "./i18n/config";
import { profile } from "./data/profile";

export function render(lang: LangCode): string {
  return renderToString(<App lang={lang} i18n={createI18n(lang)} />);
}

export function renderNotFound(lang: LangCode): string {
  return renderToString(<NotFoundApp lang={lang} i18n={createI18n(lang)} />);
}

export { locales, profile };
