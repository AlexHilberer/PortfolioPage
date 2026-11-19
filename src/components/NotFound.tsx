import { useTranslation } from "react-i18next";
import { getLanguage, type LangCode } from "../i18n/config";

export function NotFound({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="container">
        <p className="hero__role">404</p>
        <h1 className="hero__name">{t("notFound.heading")}</h1>
        <p className="hero__tagline">{t("notFound.text")}</p>
        <div className="hero__actions">
          <a className="button button--primary" href={getLanguage(lang).path}>
            {t("notFound.home")}
          </a>
        </div>
      </div>
    </section>
  );
}
