import React, { FC } from "react";
import { I18nextProvider } from "react-i18next";
import myi18n from "../../src/localization/i18n";

const i18n = myi18n(); // THIS NEEDS TO BE DETACHED FROM REACT!
const TestLocalizationProvider: FC = ({ children }) => {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TestLocalizationProvider;
