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
        paddingHorizontal: 16,
    },
});

interface Props {
    route: Route;
    title?: string;
    appbarProps?: Omit<MyAppbarProps, "title">;
}

const Layout: FC<Props> = (props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const containerStyles = {
        ...styles.container,
        backgroundColor: theme.dark
            ? theme.colors.background
            : theme.colors.surface,
    };

    return (
        <Surface style={containerStyles} accessibilityStates={{}}>
            <MyAppbar
                {...props.appbarProps}
                title={props.title || t("appTitle")}
            />
            <View style={styles.contentContainer}>{props.children}</View>
        </Surface>
    );
};
export default Layout;
