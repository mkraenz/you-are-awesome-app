import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import TabBarIcon from "../components/navigation/TabBarIcon";
import { START_SCREEN } from "../config";
import ContributionScreen from "../screens/ContributionScreen";
import HomeScreen from "../screens/HomeScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FullTheme } from "../themes/theme";
import { Route } from "./Route";

const Stack = createStackNavigator();
export const SettingsStack = () => {
    return (
        <Stack.Navigator initialRouteName={Route.Settings} headerMode="none">
            <Stack.Screen name={"base"} component={SettingsScreen} />
            <Stack.Screen
                name={Route.PrivacyPolicy}
                component={PrivacyPolicyScreen}
            />
        </Stack.Navigator>
    );
};

const Tab = createMaterialTopTabNavigator();
const NavigationApp = () => {
    const theme = useTheme() as FullTheme;
    const { t } = useTranslation();
    return (
        <NavigationContainer theme={theme as any}>
            <Tab.Navigator
                initialRouteName={START_SCREEN}
                tabBarPosition="bottom"
                tabBarOptions={{
                    showIcon: true,
                    style: {
                        backgroundColor: theme.dark
                            ? theme.colors.accentedCard
                            : theme.colors.primary,
                        marginBottom: -8,
                        marginTop: -4,
                    },
                    iconStyle: { margin: -4 },
                    renderIndicator: () => null,
                    labelStyle: {
                        textTransform: "capitalize",
                    },
                    activeTintColor: "white",
                }}
            >
                <Tab.Screen
                    name={Route.Contribute}
                    component={ContributionScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="share-alt" />
                        ),
                        tabBarLabel: t(Route.Contribute),
                    }}
                />
                <Tab.Screen
                    name={Route.Home}
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="home" />
                        ),
                        tabBarLabel: t(Route.Home),
                    }}
                />
                <Tab.Screen
                    name={Route.Settings}
                    component={SettingsStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="cog" />
                        ),
                        tabBarLabel: t(Route.Settings),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default NavigationApp;
