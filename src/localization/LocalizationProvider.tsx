import React, { FC } from "react";
import { I18nextProvider } from "react-i18next";
import { connect } from "react-redux";
import { IState } from "../state/state/IState";
import myi18n from "./i18n";
import { languageDetector } from "./languageDetector";
import { Language } from "./localization";

interface Props {
    language: Language | null;
}

const LocalizationProvider: FC<Props> = ({ children, language }) => {
    return (
        <I18nextProvider i18n={myi18n(language)(languageDetector)}>
            {children}
        </I18nextProvider>
    );
};

const mapStateToProps = (state: IState): Props => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(LocalizationProvider);
