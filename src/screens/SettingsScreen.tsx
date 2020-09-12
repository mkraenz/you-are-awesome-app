import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, Paragraph, Switch } from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import OfflineNotice from "../components/common/OfflineNotice";
import LanguageDropdown from "../components/settings/LanguageDropdown";
import PushNotificationSettings from "../components/settings/PushNotificationSettings";
import SettingsRow from "../components/settings/SettingsRow";
import { Route } from "../navigation/Route";
import { toggleAnalytics } from "../state/action-creators/toggleAnalytics";
import { toggleDarkTheme } from "../state/action-creators/toggleDarkTheme";
import { MapStateToProps } from "../state/state/MapStateToProps";
import version from "../utils/version.json";

const styles = StyleSheet.create({
    aboutContainer: {
        marginTop: "auto",
        marginHorizontal: 16,
        marginBottom: 8,
    },
});

interface StateProps {
    isDarkModeOn: boolean;
    analyticsEnabled: boolean;
    connectedToInternet: boolean;
}
interface DispatchProps {
    // TODO #256
    toggleDarkTheme: () => void;
    toggleAnalytics: () => void;
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
    const navigation = useNavigation();

    const handlePrivacyPolicyPressed = () =>
        navigation.navigate(Route.PrivacyPolicy);
    const handleSendAnalyticsPressed = () => {
        toggleAnalytics();
    };
    return (
        <Layout route={Route.Settings} title={t(Route.Settings)}>
            {!connectedToInternet && <OfflineNotice />}
            <LanguageDropdown />
            <Divider accessibilityStates={{}} />
            <PushNotificationSettings />
            <SettingsRow
                title={t("darkMode")}
                onPress={toggleDarkTheme}
                rightComponent={() => () => (
                    <Switch
                        value={isDarkModeOn}
                        onValueChange={toggleDarkTheme}
                        accessibilityStates={{}}
                    ></Switch>
                )}
            />
            <Divider accessibilityStates={{}} />
            <SettingsRow
                title={t("privacyPolicy")}
                onPress={handlePrivacyPolicyPressed}
            />
            <Divider accessibilityStates={{}} />
            <SettingsRow
                title={t("sendAnalytics")}
                onPress={handleSendAnalyticsPressed}
                rightComponent={() => () => (
                    <Switch
                        value={analyticsEnabled}
                        onValueChange={handleSendAnalyticsPressed}
                        accessibilityStates={{}}
                    ></Switch>
                )}
            />
            <Divider accessibilityStates={{}} />

            <About />
        </Layout>
    );
};

const About = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.aboutContainer}>
            <Paragraph>
                {t("buildVersion")}
                {version.jsBuildNumber}
            </Paragraph>
            <Paragraph>{t("copyright")}</Paragraph>
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
