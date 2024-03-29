import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import TabBarIcon from "../components/navigation/TabBarIcon";
import { CONFIG } from "../config";
import ContributionScreen from "../screens/ContributionScreen";
import DeveloperSettingsScreen from "../screens/DeveloperSettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MyContributionsScreen from "../screens/MyContributionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Color, FullTheme } from "../themes/theme";
import { useTranslation } from "../utils/useTranslation";
import NavContainerWithAnalytics from "./NavContainerWithAnalytics";
import { Route } from "./Route";

const styles = StyleSheet.create({
    tabBar: {
        marginBottom: -8,
        marginTop: -4,
    },
    icon: { marginTop: -4 },
    label: {
        textTransform: "capitalize",
        fontSize: 12,
    },
    hidden: {
        display: "none",
        position: undefined,
    },
});

const Stack = createStackNavigator();
export const SettingsStack = () => {
    return (
        <Stack.Navigator initialRouteName={Route.Settings} headerMode="none">
            <Stack.Screen name={Route.Settings} component={SettingsScreen} />
            <Stack.Screen
                name={Route.PrivacyPolicy}
                component={PrivacyPolicyScreen}
            />
            <Stack.Screen
                name={Route.DeveloperSettings}
                component={DeveloperSettingsScreen}
            />
        </Stack.Navigator>
    );
};

export const ContributionsStack = () => {
    return (
        <Stack.Navigator initialRouteName={Route.Contribute} headerMode="none">
            <Stack.Screen
                name={Route.Contribute}
                component={ContributionScreen}
            />
            <Stack.Screen
                name={Route.MyContributions}
                component={MyContributionsScreen}
            />
        </Stack.Navigator>
    );
};

const Tab = createMaterialTopTabNavigator();
const NavigationApp = () => {
    // hide navbar if keyboard is shown
    const [keyboardShown, setKeyboardShown] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            handleKeyboardShown
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            handleKeyboardHidden
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const handleKeyboardShown = () => setKeyboardShown(true);
    const handleKeyboardHidden = () => setKeyboardShown(false);

    const theme = useTheme() as FullTheme;

    const { t } = useTranslation();
    return (
        <NavContainerWithAnalytics>
            <Tab.Navigator
                initialRouteName={CONFIG.startScreen}
                tabBarPosition="bottom"
                tabBarOptions={{
                    showIcon: true,
                    style: keyboardShown
                        ? styles.hidden
                        : {
                              ...styles.tabBar,
                              backgroundColor: theme.dark
                                  ? theme.colors.accentedCard
                                  : theme.colors.primary,
                          },
                    iconStyle: styles.icon,
                    renderIndicator: () => null,
                    labelStyle: styles.label,
                    activeTintColor: Color.White,
                }}
                initialLayout={{ width: Dimensions.get("window").width }}
            >
                <Tab.Screen
                    name={Route.Contribute}
                    component={ContributionsStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="share-alt" />
                        ),
                        tabBarLabel: t("contributeNavLabel"),
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
                    name={Route.Favorites}
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="heart" />
                        ),
                        tabBarLabel: t(Route.Favorites),
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
        </NavContainerWithAnalytics>
    );
};

export default NavigationApp;
