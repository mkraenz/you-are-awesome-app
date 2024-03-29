import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Portal, Surface, useTheme } from "react-native-paper";
import { openFeedbackForm } from "../../api/openFeedbackForm";
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
    title: string;
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
    const handleBugReportConfirm = async () => {
        toggleBugReportOpen();
        await openFeedbackForm();
    };

    return (
        <Surface style={containerStyles}>
            <MyAppbar
                {...appbarProps}
                title={title}
                onBugActionPress={toggleBugReportOpen}
            />
            <View style={contentContainerStyles}>
                {CONFIG.featureFlags.bugReportIconVisible && (
                    <Portal>
                        {/* push Portal to top-level to test Dialogs individually. */}
                        <BugReportDialog
                            visible={bugReportOpen}
                            handleClose={toggleBugReportOpen}
                            handleConfirm={handleBugReportConfirm}
                        />
                    </Portal>
                )}
                {children}
            </View>
        </Surface>
    );
};

export default Layout;
