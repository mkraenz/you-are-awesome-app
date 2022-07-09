import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { CONFIG } from "../../config";

export interface MyAppbarProps {
    title: string;
    onBugActionPress: () => void;
    bugReportIconVisible?: boolean;
    onBack?: () => void;
    actionIcon?: string;
    onActionPress?: () => void;
}

const MyAppbar: FC<MyAppbarProps> = ({
    title,
    onBack,
    actionIcon,
    onActionPress,
    onBugActionPress,
    bugReportIconVisible = CONFIG.featureFlags.bugReportIconVisible,
}) => {
    const { dark } = useTheme();
    return (
        <Appbar.Header statusBarHeight={StatusBar.currentHeight}>
            {onBack && <Appbar.BackAction onPress={onBack} />}
            <Appbar.Content
                title={title}
                style={
                    onBack && !actionIcon
                        ? {}
                        : { alignItems: "center", display: "flex" }
                }
            />
            {actionIcon && (
                <Appbar.Action
                    icon={actionIcon}
                    onPress={onActionPress}
                    testID={"appbar-action-item-right"}
                />
            )}
            {bugReportIconVisible && (
                <Appbar.Action
                    icon="bug"
                    onPress={onBugActionPress}
                    // TODO a11y labels need to be translated too
                    accessibilityLabel="report a bug"
                />
            )}
            <ExpoStatusBar style={dark ? "light" : "dark"} />
        </Appbar.Header>
    );
};

export default MyAppbar;
