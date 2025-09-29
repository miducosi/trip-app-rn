import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/src/locales/en.json";
import pt from "@/src/locales/pt.json";
import { translationKeys, TranslationKey } from "@/src/locales/keys";

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

const FALLBACK_LANGUAGE = "en";

export type SupportedLanguage = keyof typeof resources;

export const supportedLanguages: Array<{
  code: SupportedLanguage;
  labelKey: TranslationKey;
}> = [
  { code: "en", labelKey: translationKeys.common.english },
  { code: "pt", labelKey: translationKeys.common.portuguesePortugal },
];

function initI18n() {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: FALLBACK_LANGUAGE,
    fallbackLng: FALLBACK_LANGUAGE,
    resources,
    interpolation: { escapeValue: false },
  });
}

initI18n();

export async function changeAppLanguage(lng: string) {
  await i18n.changeLanguage(lng);
}

export default i18n;
