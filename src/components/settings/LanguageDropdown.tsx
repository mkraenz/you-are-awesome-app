import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Menu } from "react-native-paper";
import { LanguageCodeToLocalizedLang } from "../../localization/localization";
import SettingsRow from "./SettingsRow";

const LanguageDropdown: FC = () => {
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
        );
        if (selectedLangCode.length === 1) {
            i18n.changeLanguage(selectedLangCode[0]);
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
                    {i !== languages.length - 1 && <Divider />}
                </Fragment>
            ))}
        </Menu>
    );
};

export default LanguageDropdown;
