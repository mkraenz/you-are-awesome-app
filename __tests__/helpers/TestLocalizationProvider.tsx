import React, { FC } from "react";
import { I18nextProvider } from "react-i18next";
import myi18n from "../../src/localization/i18n";

const TestLocalizationProvider: FC<{ detected?: string }> = ({
    children,
    detected = "en",
}) => {
    const mockLanguageDetector = {
        type: "languageDetector" as const,
        async: true, // flags below detection to be async
        detect: (callback: (locale: string) => void) => {
            callback(detected);
        },
        init: () => {},
        cacheUserLanguage: () => {},
    };

    return (
        <I18nextProvider i18n={myi18n(null)(mockLanguageDetector)}>
            {children}
        </I18nextProvider>
    );
};

export default TestLocalizationProvider;
