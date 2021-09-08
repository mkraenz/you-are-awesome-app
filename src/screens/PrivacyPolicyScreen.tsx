import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
import { Route } from "../navigation/Route";
import { useTranslation } from "../utils/useTranslation";

const styles = StyleSheet.create({
    viewInBrowserButton: {
        margin: 16,
    },
});

const PrivacyPolicyScreen: React.FC = () => {
    const { t } = useTranslation();
    const { goBack } = useNavigation();
    const openInBrowser = () => {
        Analytics.logLinkFollow("privacyPolicy");
        Linking.openURL(t("privacyPolicyLink"));
    };
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
                onPress={openInBrowser}
            >
                {t("viewInBrowser")}
            </Button>
            <WebView source={{ uri: t("privacyPolicyLink") }} />
        </Layout>
    );
};

export default PrivacyPolicyScreen;
