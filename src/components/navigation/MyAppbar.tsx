import React, { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { Appbar, Menu } from "react-native-paper";

interface Props {
    title: string;
}

interface TopMenuProps {
    visible: boolean;
    onPress: () => void;
    onClose: () => void;
    anchor: ReactNode;
}

const TopMenu: FC<TopMenuProps> = ({ visible, onPress, onClose, anchor }) => {
    const { t } = useTranslation();
    return (
        <Menu visible={visible} onDismiss={onClose} anchor={anchor}>
            <Menu.Item onPress={onPress} title={t("privacyPolicy")} />
        </Menu>
    );
};

const MyAppbar: FC<Props> = ({ title }) => {
    const { t } = useTranslation();
    const [menuOpen, openMenu] = useState(false);
    return (
        <Appbar.Header accessibilityStates={{}}>
            <Appbar.Content
                title={t("appTitle")}
                style={{ alignItems: "center", display: "flex" }}
                accessibilityStates={{}}
            ></Appbar.Content>
            <TopMenu
                visible={menuOpen}
                onClose={() => openMenu(false)}
                onPress={() => Linking.openURL(t("privacyPolicyLink"))}
                anchor={
                    <Appbar.Action
                        icon="dots-vertical"
                        onPress={() => openMenu(true)}
                        accessibilityStates={{}}
                    />
                }
            ></TopMenu>
        </Appbar.Header>
    );
};

export default MyAppbar;
