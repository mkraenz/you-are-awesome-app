import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import { Appbar } from "react-native-paper";

interface Props {
    title: string;
    onBack?: () => void;
}

const MyAppbar: FC<Props> = ({ title, onBack }) => {
    const { t } = useTranslation();
    return (
        <Appbar.Header
            accessibilityStates={{}}
            statusBarHeight={StatusBar.currentHeight}
        >
            {onBack && (
                <Appbar.BackAction onPress={onBack} accessibilityStates={{}} />
            )}
            <Appbar.Content
                title={title}
                style={onBack ? {} : { alignItems: "center", display: "flex" }}
                accessibilityStates={{}}
            />
        </Appbar.Header>
    );
};

export default MyAppbar;
