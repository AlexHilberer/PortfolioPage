import { useTranslation } from "react-i18next";
import { getLanguage, type LangCode } from "../i18n/config";

/**
 * `path` is the requested URL path. It is only known in the browser, so the
 * prerendered fallback shows an ellipsis.
 */
export function NotFound({ lang, path = "/\u2026" }: { lang: LangCode; path?: string }) {
  const { t } = useTranslation();
  const home = getLanguage(lang).path;
  return (
    <section className="hero not-found">
      <div className="container">
        <div className="terminal" role="img" aria-label={`404: ${t("notFound.terminalError")}`}>
          <div className="terminal__bar" aria-hidden="true">
            <span className="terminal__dot"></span>
            <span className="terminal__dot"></span>
            <span className="terminal__dot"></span>
            <span className="terminal__title">bash</span>
          </div>
          <div className="terminal__body" aria-hidden="true">
            <p className="terminal__line">
              <span className="terminal__prompt">$</span> cd {path}
            </p>
            <p className="terminal__line terminal__line--error">
              bash: cd: {path}: {t("notFound.terminalError")}
            </p>
            <p className="terminal__line">
              <span className="terminal__prompt">$</span> cd ~
              <span className="terminal__cursor"></span>
            </p>
          </div>
        </div>
        <h1 className="hero__name">{t("notFound.heading")}</h1>
        <p className="hero__tagline">{t("notFound.text")}</p>
        <div className="hero__actions">
          <a className="button button--primary" href={home}>
            {t("notFound.home")}
          </a>
        </div>
      </div>
    </section>
  );
}
