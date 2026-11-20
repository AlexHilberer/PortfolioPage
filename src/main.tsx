import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/base.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/logo.css";
import "./styles/intro.css";
import { App, NotFoundApp } from "./App";
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

if (container.hasAttribute("data-not-found")) {
  // 404.html is one static file for every unknown path, so its language is only
  // known here (from the URL). The prerendered default-language markup is replaced.
  document.title = i18n.t("notFound.title");
  createRoot(container).render(
    <StrictMode>
      <NotFoundApp lang={lang} i18n={i18n} />
    </StrictMode>
  );
} else {
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
}
