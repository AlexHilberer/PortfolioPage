import { useTranslation } from "react-i18next";
import { LANGUAGES, LANG_STORAGE_KEY, type LangCode } from "../i18n/config";

/** `paths` lets a page link to its own counterpart (e.g. Impressum ↔ Legal notice). */
export function LanguageSwitcher({ current, paths }: { current: LangCode; paths?: Record<LangCode, string> }) {
  const { t } = useTranslation();

  return (
    <div className="lang-toggle" role="group" aria-label={t("nav.langToggleAria")}>
      {LANGUAGES.map((language) => {
        const active = language.code === current;
        return (
          <a
            key={language.code}
            className={"lang-toggle__button" + (active ? " is-active" : "")}
            href={paths?.[language.code] ?? language.path}
            hrefLang={language.code}
            lang={language.code}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              try {
                localStorage.setItem(LANG_STORAGE_KEY, language.code);
              } catch {
                /* storage unavailable: navigation still works */
              }
            }}
          >
            {language.label}
          </a>
        );
      })}
    </div>
  );
}
