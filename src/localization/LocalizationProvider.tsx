import React, { FC, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { connect } from "react-redux";
import { IState } from "../state/state/IState";
import myi18n from "./i18n";
import { languageDetector } from "./languageDetector";
import { Language } from "./localization";

interface Props {
    language: Language | null;
}

const i18n = myi18n(languageDetector); // THIS NEEDS TO BE DETACHED FROM REACT!

const LocalizationProvider: FC<Props> = ({ children, language }) => {
    useEffect(() => {
        if (language) i18n.changeLanguage(language);
    }, [language, i18n.language]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

const mapStateToProps = (state: IState): Props => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(LocalizationProvider);
