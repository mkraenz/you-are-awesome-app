import * as Localization from "expo-localization";

export const languageDetector = {
    type: "languageDetector" as const,
    async: true, // flags below detection to be async
    detect: (callback: (locale: string) => void) => {
        callback(Localization.locale);
    },
    init: () => {},
    cacheUserLanguage: () => {},
};
