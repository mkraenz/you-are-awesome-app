import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import Layout from "../components/common/Layout";
import { Route } from "../navigation/Route";

const styles = StyleSheet.create({
    viewInBrowserButton: {
        margin: 16,
    },
});

const PrivacyPolicyScreen: React.FC = () => {
    const { t } = useTranslation();
    const { goBack } = useNavigation();
    return (
        <Layout
            route={Route.PrivacyPolicy}
            appbarProps={{
                onBack: () => goBack(),
            }}
            title={t(Route.PrivacyPolicy)}
        >
            <Button
                mode="contained"
                style={styles.viewInBrowserButton}
                onPress={() => Linking.openURL(t("privacyPolicyLink"))}
            >
                {t("viewInBrowser")}
            </Button>
            <WebView source={{ uri: t("privacyPolicyLink") }} />
        </Layout>
    );
};

export default PrivacyPolicyScreen;
