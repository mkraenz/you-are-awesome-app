import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const OfflineNotice: FC<{}> = () => (
    <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
);

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: "#b52424",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    offlineText: {
        color: "#fff",
    },
});

export default OfflineNotice;
