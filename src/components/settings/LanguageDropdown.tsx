import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Menu, Subheading } from "react-native-paper";
import { connect } from "react-redux";
import { CONFIG } from "../../config";
import {
    Language,
    LanguageCodeToLocalizedLang,
} from "../../localization/localization";
import { setLanguage } from "../../state/action-creators/setLanguage";
import { IState } from "../../state/state/IState";
import SettingsRow from "./SettingsRow";

interface Props {
    setLanguage: (Language: Language) => void;
    language: Language;
}

const LanguageDropdown: FC<Props> = ({ setLanguage, language }) => {
    const { t, i18n } = useTranslation();
    const languages = Object.values(LanguageCodeToLocalizedLang);
    const [visible, setVisible] = useState(false);

    const selectLanguage = (value: string) => {
        const selectedLangCode = Object.keys(
            LanguageCodeToLocalizedLang
        ).filter(
            (langCode) =>
                LanguageCodeToLocalizedLang[
                    langCode as keyof typeof LanguageCodeToLocalizedLang
                ] === value
        ) as Language[];
        if (selectedLangCode.length === 1) {
            setLanguage(selectedLangCode[0]);
        }
    };
    const getCurrentLang = () => {
        // special case for inferring the initially detected language
        const i18nLang = i18n.language.slice(0, 2).toLocaleLowerCase();
        const langCodes = Object.values(Language) as string[];
        const langCodeExists = langCodes.includes(i18nLang);
        if (langCodeExists) {
            return LanguageCodeToLocalizedLang[i18nLang as Language];
        } else {
            return LanguageCodeToLocalizedLang[language];
        }
    };

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <SettingsRow
                    onPress={() => setVisible(true)}
                    title={t("language")}
                    rightComponent={() => () =>
                        <Subheading>{getCurrentLang()}</Subheading>}
                ></SettingsRow>
            }
        >
            {languages.map((lang, i) => (
                <Fragment key={lang}>
                    <Menu.Item
                        key={lang}
                        onPress={() => {
                            selectLanguage(lang);
                            setVisible(false);
                        }}
                        title={lang}
                    />
                    {i !== languages.length - 1 && <Divider />}
                </Fragment>
            ))}
        </Menu>
    );
};

const mapStateToProps = (state: IState): Pick<Props, "language"> => ({
    language: state.app.language || CONFIG.fallbackLanguage,
});
const mapDispatchToProps: Pick<Props, "setLanguage"> = { setLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdown);
