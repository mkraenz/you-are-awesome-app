import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export interface MyAppbarProps {
    title: string;
    onBack?: () => void;
    actionIcon?: string;
    onActionPress?: () => void;
}

const MyAppbar: FC<MyAppbarProps> = ({
    title,
    onBack,
    actionIcon,
    onActionPress,
}) => {
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
                style={
                    onBack && !actionIcon
                        ? {}
                        : { alignItems: "center", display: "flex" }
                }
                accessibilityStates={{}}
            />
            {actionIcon && (
                <Appbar.Action
                    accessibilityStates={{}}
                    icon={actionIcon}
                    onPress={onActionPress}
                />
            )}
            <ExpoStatusBar style={dark ? "light" : "dark"} />
        </Appbar.Header>
    );
};

export default MyAppbar;
