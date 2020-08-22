import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Menu } from "react-native-paper";
import { connect } from "react-redux";
import {
    Language,
    LanguageCodeToLocalizedLang,
} from "../../localization/localization";
import { setLanguage } from "../../state/action-creators/setLanguage";
import { IState } from "../../state/state/IState";
import SettingsRow from "./SettingsRow";

interface Props {
    setLanguage: (Language: Language) => void;
}

const LanguageDropdown: FC<Props> = ({ setLanguage }) => {
    const { t } = useTranslation();
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
    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <SettingsRow
                    onPress={() => setVisible(true)}
                    title={t("language")}
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
                    {i !== languages.length - 1 && (
                        <Divider accessibilityStates={{}} />
                    )}
                </Fragment>
            ))}
        </Menu>
    );
};

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps = { setLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdown);
