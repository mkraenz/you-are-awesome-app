import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -100, // ensure full width
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    text: {
        color: "white",
    },
});

const OfflineNotice: FC<{}> = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const containerStyle = {
        ...styles.container,
        backgroundColor: theme.colors.error,
    };
    return (
        <View style={containerStyle}>
            <Text style={styles.text}>{t("noInternet")}</Text>
        </View>
    );
};

export default OfflineNotice;
