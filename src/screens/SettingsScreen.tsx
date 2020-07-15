import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, Paragraph, Switch } from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import LanguageDropdown from "../components/settings/LanguageDropdown";
import PushNotificationSettings from "../components/settings/PushNotificationSettings";
import SettingsRow from "../components/settings/SettingsRow";
import { Route } from "../navigation/Route";
import { requestReadSettings } from "../state/action-creators/requestReadSettings";
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
}
interface DispatchProps {
    toggleDarkTheme: () => void;
    requestReadSettings: () => void;
}

type Props = StateProps & DispatchProps;

const SettingsScreen: FC<Props> = ({
    isDarkModeOn,
    toggleDarkTheme,
    requestReadSettings,
}) => {
    const { t } = useTranslation();

    const [readFinished, setReadFinished] = useState(false);
    useEffect(() => {
        // TODO load existing settings into redux on app startup -> Redux persist
        if (!readFinished) {
            requestReadSettings();
            setReadFinished(true);
        }
    }, [readFinished, setReadFinished]);

    return (
        <Layout route={Route.Settings}>
            <PushNotificationSettings />
            <SettingsRow
                title={t("darkMode")}
                onPress={toggleDarkTheme}
                rightComponent={() => (
                    <Switch
                        value={isDarkModeOn}
                        onValueChange={toggleDarkTheme}
                    ></Switch>
                )}
            ></SettingsRow>
            <Divider />
            <LanguageDropdown />
            <Divider />
            <About />
        </Layout>
    );
};

const About = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.aboutContainer}>
            <Paragraph>
                {t("buildVersion")} {version.jsBuildNumber}
            </Paragraph>
            <Paragraph>{t("copyright")}</Paragraph>
        </View>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    isDarkModeOn: state.app.isDarkModeOn,
});

const mapDispatchToProps: DispatchProps = {
    toggleDarkTheme,
    requestReadSettings,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
