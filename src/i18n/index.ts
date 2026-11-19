import i18next, { type i18n } from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../locales/de.json";
import en from "../locales/en.json";
import { DEFAULT_LANG, type LangCode } from "./config";

/** Locale resources keyed by language code. Must contain every code in LANGUAGES. */
export const locales: Record<LangCode, typeof de> = { de, en };

export type Locale = typeof de;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: Locale };
  }
}

/** Create an isolated, synchronously initialised i18n instance (SSR safe). */
export function createI18n(lng: LangCode): i18n {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    lng,
    fallbackLng: DEFAULT_LANG,
    resources: {
      de: { translation: locales.de },
      en: { translation: locales.en }
    },
    interpolation: { escapeValue: false },
    initImmediate: false,
    showSupportNotice: false,
    react: { useSuspense: false }
  });
  return instance;
}
