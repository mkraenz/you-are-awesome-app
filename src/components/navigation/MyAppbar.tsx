import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

interface Props {
    title: string;
    onBack?: () => void;
}

const MyAppbar: FC<Props> = ({ title, onBack }) => {
    const { dark } = useTheme();
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
            <ExpoStatusBar style={dark ? "light" : "dark"} />
        </Appbar.Header>
    );
};

export default MyAppbar;
