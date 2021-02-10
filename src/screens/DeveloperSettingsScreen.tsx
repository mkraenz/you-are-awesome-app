import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Paragraph } from "react-native-paper";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
import { CONFIG } from "../config";
import { Route } from "../navigation/Route";

const DeveloperSettingsScreen: FC = () => {
    const { goBack } = useNavigation();
    const { t } = useTranslation();
    return (
        <Layout
            appbarProps={{ onBack: goBack }}
            route={Route.DeveloperSettings}
            title={t(Route.DeveloperSettings)}
        >
            <Paragraph>Env: {CONFIG.env}</Paragraph>
            <Paragraph>
                Release channel: {String(Constants.manifest.releaseChannel)}
            </Paragraph>
            <MyButton onPress={Analytics.resetAnalyticsData}>
                Reset Analytics
            </MyButton>
            <MyButton onPress={Analytics.logDebug}>
                Trigger Analytics Contribute event
            </MyButton>
            <MyButton
                onPress={() => {
                    throw new Error("Test Error");
                }}
            >
                Throw an Error
            </MyButton>
        </Layout>
    );
};

const MyButton: FC<{ onPress: () => void }> = ({ children, onPress }) => {
    return (
        <Button onPress={onPress} mode="outlined" style={{ margin: 8 }}>
            {children}
        </Button>
    );
};

export default DeveloperSettingsScreen;
