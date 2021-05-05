import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, List, Paragraph, Switch } from "react-native-paper";
import { connect } from "react-redux";
import { Analytics } from "../api/Analytics";
import { openFeedbackForm } from "../api/openFeedbackForm";
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
    sectionHeader: {
        marginHorizontal: -12,
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

const SectionHeader = ({ text }: { text: string }) => (
    <List.Subheader style={styles.sectionHeader}>{text}</List.Subheader>
);

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
    const rateTheApp = () => Linking.openURL(CONFIG.uri.playstoreUrl);

    return (
        <Layout route={Route.Settings} title={t(Route.Settings)}>
            <ScrollView>
                <List.Section>
                    <SectionHeader text={t("settingsGeneral")} />
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
                </List.Section>

                <List.Section>
                    <SectionHeader text={t("settingsFeedback")} />
                    <SettingsRow
                        title={t("settingsSubmitFeedback")}
                        onPress={openFeedbackForm}
                    />
                    <Divider />
                    <SettingsRow title={t("rateTheApp")} onPress={rateTheApp} />
                </List.Section>

                <List.Section>
                    <SectionHeader text={t("settingsPrivacy")} />
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
                </List.Section>

                {CONFIG.featureFlags.developerSettings && (
                    <List.Section>
                        <SectionHeader text={t("settingsDeveloper")} />
                        <SettingsRow
                            onPress={() => navigate(Route.DeveloperSettings)}
                            title={t(Route.DeveloperSettings)}
                        />
                    </List.Section>
                )}

                <List.Section>
                    <SectionHeader text={t("settingsAbout")} />
                    <VersionAndCopyright />
                </List.Section>
            </ScrollView>
        </Layout>
    );
};

const VersionAndCopyright = () => {
    const { t } = useTranslation();
    const openCompanyWebsite = () => {
        Analytics.logLinkFollow("company");
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
                <Paragraph onPress={openCompanyWebsite} style={styles.link}>
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
