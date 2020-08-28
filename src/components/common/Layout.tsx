import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { Route } from "../../navigation/Route";
import MyAppbar, { MyAppbarProps } from "../navigation/MyAppbar";

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
    appbarProps?: Omit<MyAppbarProps, "title">;
    containerStyleOverwrites?: { paddingLeft: number };
}

const Layout: FC<Props> = ({
    children,
    title,
    appbarProps,
    containerStyleOverwrites,
}) => {
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

    return (
        <Surface style={containerStyles} accessibilityStates={{}}>
            <MyAppbar {...appbarProps} title={title || t("appTitle")} />
            <View style={contentContainerStyles}>{children}</View>
        </Surface>
    );
};
export default Layout;
