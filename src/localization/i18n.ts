import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localization from "./localization";

const DEBUG = false;

const myi18n = (languageDetector?: {
    type: "languageDetector";
    async: boolean;
    detect: (callback: (locale: string) => void) => void;
    init: () => void;
    cacheUserLanguage: () => void;
}) => {
    const i18 = i18n;
    if (languageDetector) i18n.use(languageDetector);
    i18.use(initReactI18next).init({
        resources: localization,
        fallbackLng: "en",
        defaultNS: "default",
        debug: DEBUG,
        interpolation: {
            escapeValue: false, // not needed; default behavior of react
        },
        cleanCode: true,
    });
    return i18;
};

export default myi18n;
