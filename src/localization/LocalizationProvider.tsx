import React, { FC } from "react";
import { I18nextProvider } from "react-i18next";
import myi18n from "./i18n";
import { languageDetector } from "./languageDetector";

const LocalizationProvider: FC = ({ children }) => {
    return (
        <I18nextProvider i18n={myi18n(languageDetector)}>
            {children}
        </I18nextProvider>
    );
};

export default LocalizationProvider;
