import { I18nextProvider } from "react-i18next";
import type { i18n } from "i18next";
import type { LangCode } from "./i18n/config";
import { Header } from "./components/Header";
import { About, Contact, Credentials, Experience, Footer, Hero, Projects } from "./components/Sections";

export function App({ lang, i18n }: { lang: LangCode; i18n: i18n }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <About />
        <Projects />
        <Experience lang={lang} />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </I18nextProvider>
  );
}
