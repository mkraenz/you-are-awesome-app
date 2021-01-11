import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
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
            <MyButton onPress={Analytics.resetAnalyticsData}>
                Reset Analytics
            </MyButton>
            <MyButton onPress={Analytics.logDebug}>
                Trigger Analytics Contribute event
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
