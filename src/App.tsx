import { I18nextProvider } from "react-i18next";
import type { i18n } from "i18next";
import { getLanguage, type LangCode } from "./i18n/config";
import { Header } from "./components/Header";
import { NotFound } from "./components/NotFound";
import { About, Contact, Credentials, Footer, Hero, Projects, Work } from "./components/Sections";

export function App({ lang, i18n }: { lang: LangCode; i18n: i18n }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <About />
        <Work lang={lang} />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </I18nextProvider>
  );
}

/** Standalone 404 page: same header and footer as the site, language taken from the URL. */
export function NotFoundApp({ lang, i18n, path }: { lang: LangCode; i18n: i18n; path?: string }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header lang={lang} linkBase={getLanguage(lang).path} />
      <main>
        <NotFound lang={lang} path={path} />
      </main>
      <Footer />
    </I18nextProvider>
  );
}
