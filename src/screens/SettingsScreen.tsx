import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";
import { Divider, Paragraph, Switch } from "react-native-paper";
import { connect } from "react-redux";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
import OfflineNotice from "../components/common/OfflineNotice";
import LanguageDropdown from "../components/settings/LanguageDropdown";
import PushNotificationSettings from "../components/settings/PushNotificationSettings";
import SettingsRow from "../components/settings/SettingsRow";
import { CONFIG } from "../config";
import { Route } from "../navigation/Route";
import { toggleAnalytics } from "../state/action-creators/toggleAnalytics";
import { toggleDarkTheme } from "../state/action-creators/toggleDarkTheme";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { Color } from "../themes/theme";
import { jsBuildNumber } from "../utils/version.json";

const styles = StyleSheet.create({
    aboutContainer: {
        marginTop: "auto",
        marginHorizontal: 16,
        marginBottom: 8,
    },
    link: {
        color: Color.Blue,
        textDecorationLine: "underline",
    },
});

interface StateProps {
    isDarkModeOn: boolean;
    analyticsEnabled: boolean;
    connectedToInternet: boolean;
}
interface DispatchProps {
    toggleDarkTheme: typeof toggleDarkTheme;
    toggleAnalytics: typeof toggleAnalytics;
}

type Props = StateProps & DispatchProps;

const SettingsScreen: FC<Props> = ({
    isDarkModeOn,
    toggleDarkTheme,
    analyticsEnabled,
    toggleAnalytics,
    connectedToInternet,
}) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const handlePrivacyPolicyPressed = () => navigate(Route.PrivacyPolicy);
    return (
        <Layout route={Route.Settings} title={t(Route.Settings)}>
            {!connectedToInternet && <OfflineNotice />}
            <LanguageDropdown />
            <Divider />
            <PushNotificationSettings />
            <SettingsRow
                title={t("darkMode")}
                onPress={toggleDarkTheme}
                rightComponent={() => () => (
                    <Switch
                        value={isDarkModeOn}
                        onValueChange={toggleDarkTheme}
                    ></Switch>
                )}
            />
            <Divider />
            <SettingsRow
                title={t(Route.PrivacyPolicy)}
                onPress={handlePrivacyPolicyPressed}
            />
            <Divider />
            <SettingsRow
                title={t("sendAnalytics")}
                onPress={toggleAnalytics}
                rightComponent={() => () => (
                    <Switch
                        value={analyticsEnabled}
                        onValueChange={toggleAnalytics}
                    ></Switch>
                )}
            />
            <Divider />
            {CONFIG.featureFlags.developerSettings && (
                <SettingsRow
                    onPress={() => navigate(Route.DeveloperSettings)}
                    title={t(Route.DeveloperSettings)}
                />
            )}
            <About />
        </Layout>
    );
};

const About = () => {
    const { t } = useTranslation();
    const handleCompanyLinkClicked = () => {
        Analytics.logLinkFollow(t("companyLink"));
        Linking.openURL(t("companyLink"));
    };
    return (
        <View style={styles.aboutContainer}>
            <Paragraph>
                {t("buildVersion")}
                {jsBuildNumber}
            </Paragraph>
            <Paragraph>
                {t("copyright1")}
                <Paragraph
                    onPress={handleCompanyLinkClicked}
                    style={styles.link}
                >
                    {t("copyright2Company")}
                </Paragraph>
                {t("copyright3")}
            </Paragraph>
        </View>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    isDarkModeOn: state.app.isDarkModeOn,
    analyticsEnabled: state.app.analyticsEnabled,
    connectedToInternet: state.network.connected,
});

const mapDispatchToProps: DispatchProps = {
    toggleDarkTheme,
    toggleAnalytics,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
