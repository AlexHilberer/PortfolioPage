import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/base.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/logo.css";
import "./styles/intro.css";
import { App, LegalApp, NotFoundApp } from "./App";
import { createI18n } from "./i18n";
import { LANGUAGES, LANG_STORAGE_KEY, isLangCode, langFromPath, getLanguage, legalPageFromPath } from "./i18n/config";

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

const legalPage = legalPageFromPath(window.location.pathname);

if (legalPage) {
  const app = (
    <StrictMode>
      <LegalApp lang={lang} i18n={i18n} page={legalPage} />
    </StrictMode>
  );
  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
} else if (container.hasAttribute("data-not-found")) {
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
  // Prerendered pages contain the app markup; the dev server only has the
  // <!--app-html--> placeholder comment, so check for an element.
  if (container.firstElementChild) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}
