import React, { FC } from "react";
import { I18nextProvider } from "react-i18next";
import myi18n from "../../src/localization/i18n";

const TestLocalizationProvider: FC = ({ children }) => {
    const mockLanguageDetector = {
        type: "languageDetector" as const,
        async: true, // flags below detection to be async
        detect: (callback: (locale: string) => void) => {
            callback("en");
        },
        init: () => {},
        cacheUserLanguage: () => {},
    };

    return (
        <I18nextProvider i18n={myi18n(mockLanguageDetector)}>
            {children}
        </I18nextProvider>
    );
};

export default TestLocalizationProvider;
