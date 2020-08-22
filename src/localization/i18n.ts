import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localization, { Language } from "./localization";

const DEBUG = false;

const myi18n = (language: Language | null) => (languageDetector?: {
    type: "languageDetector";
    async: boolean;
    detect: (callback: (locale: string) => void) => void;
    init: () => void;
    cacheUserLanguage: () => void;
}) => {
    if (languageDetector) i18n.use(languageDetector);
    i18n.use(initReactI18next).init({
        lng: language || undefined,
        resources: localization,
        fallbackLng: Language.English,
        defaultNS: "default",
        debug: DEBUG,
        interpolation: {
            escapeValue: false, // not needed; default behavior of react
        },
        cleanCode: true,
    });
    return i18n;
};

export default myi18n;
