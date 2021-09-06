import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useTranslation } from "../../utils/useTranslation";

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
