import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localization, { Language } from "./localization";

const DEBUG = false;

const myi18n = (languageDetector?: {
    type: "languageDetector";
    async: boolean;
    detect: (callback: (locale: string) => void) => void;
    init: () => void;
    cacheUserLanguage: () => void;
}) => {
    if (languageDetector) i18n.use(languageDetector);
    i18n.use(initReactI18next).init({
        compatibilityJSON: "v3", // fixes i18next::pluralResolver error https://www.i18next.com/misc/migration-guide#v20.x.x-to-v21.0.0
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
