import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Portal, Surface, useTheme } from "react-native-paper";
import { CONFIG } from "../../config";
import { Route } from "../../navigation/Route";
import MyAppbar, { MyAppbarProps } from "../navigation/MyAppbar";
import BugReportDialog from "./BugReportDialog";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
});

interface Props {
    route: Route;
    title?: string;
    appbarProps?: Omit<MyAppbarProps, "title" | "onBugActionPress">;
    containerStyleOverwrites?: { paddingLeft: number };
}

const Layout: FC<Props> = ({
    children,
    title,
    appbarProps,
    containerStyleOverwrites,
}) => {
    const [bugReportOpen, setBugReportOpen] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();

    const containerStyles = {
        ...styles.container,
        backgroundColor: theme.dark
            ? theme.colors.background
            : theme.colors.surface,
    };
    const contentContainerStyles = {
        ...styles.contentContainer,
        ...containerStyleOverwrites,
    };

    const toggleBugReportOpen = () => setBugReportOpen(!bugReportOpen);

    return (
        <Surface style={containerStyles}>
            <MyAppbar
                {...appbarProps}
                title={title || t("appTitle")}
                onBugActionPress={toggleBugReportOpen}
            />
            <View style={contentContainerStyles}>
                {CONFIG.featureFlags.bugReportIconVisible && (
                    <Portal>
                        {/* push Portal to top-level to test Dialogs individually. */}
                        <BugReportDialog
                            visible={bugReportOpen}
                            handleClose={toggleBugReportOpen}
                        />
                    </Portal>
                )}
                {children}
            </View>
        </Surface>
    );
};

export default Layout;
