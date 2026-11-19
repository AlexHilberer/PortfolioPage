import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/base.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import { App } from "./App";
import { createI18n } from "./i18n";
import { LANGUAGES, LANG_STORAGE_KEY, isLangCode, langFromPath, getLanguage } from "./i18n/config";

const lang = langFromPath(window.location.pathname);

// Return visitors who picked another language land on the matching page.
// Only applied on the default-language root, so the switcher never loops.
if (lang === LANGUAGES[0].code && window.location.pathname === getLanguage(lang).path) {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLangCode(stored) && stored !== lang) {
      window.location.replace(getLanguage(stored).path + window.location.hash);
    }
  } catch {
    /* storage unavailable */
  }
}

document.documentElement.lang = lang;

const i18n = createI18n(lang);
const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App lang={lang} i18n={i18n} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
