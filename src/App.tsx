import { I18nextProvider } from "react-i18next";
import { useReveal } from "./useReveal";
import { useSpine } from "./useSpine";
import type { i18n } from "i18next";
import { getLanguage, type LangCode } from "./i18n/config";
import { Header } from "./components/Header";
import { NotFound } from "./components/NotFound";
import { About, Credentials, Footer, Hero, Projects, Work } from "./components/Sections";

export function App({ lang, i18n }: { lang: LangCode; i18n: i18n }) {
  useReveal();
  useSpine();
  return (
    <I18nextProvider i18n={i18n}>
      <Header lang={lang} />
      <main>
        {/* wave from the hero logo into the page spine; drawn by useSpine on wide screens */}
        <svg className="spine-link" aria-hidden="true" focusable="false">
          <path className="spine-link__track" pathLength={1} />
          <path className="spine-link__fill" pathLength={1} />
        </svg>
        <Hero lang={lang} />
        <About />
        <Work lang={lang} />
        <Projects />
        <Credentials />
      </main>
      <Footer spine />
    </I18nextProvider>
  );
}

/** Standalone 404 page: same header and footer as the site, language taken from the URL. */
export function NotFoundApp({ lang, i18n }: { lang: LangCode; i18n: i18n }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header lang={lang} linkBase={getLanguage(lang).path} />
      <main>
        <NotFound lang={lang} />
      </main>
      <Footer />
    </I18nextProvider>
  );
}
