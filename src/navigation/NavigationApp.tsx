import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Keyboard, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import TabBarIcon from "../components/navigation/TabBarIcon";
import { START_SCREEN } from "../config";
import ContributionScreen from "../screens/ContributionScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MyContributionsScreen from "../screens/MyContributionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FullTheme } from "../themes/theme";
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
            <Stack.Screen name={"base"} component={SettingsScreen} />
            <Stack.Screen
                name={Route.PrivacyPolicy}
                component={PrivacyPolicyScreen}
            />
        </Stack.Navigator>
    );
};

export const ContributionsStack = () => {
    return (
        <Stack.Navigator initialRouteName={Route.Contribute} headerMode="none">
            <Stack.Screen name={"base"} component={ContributionScreen} />
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
        Keyboard.addListener("keyboardDidShow", handleKeyboardShown);
        Keyboard.addListener("keyboardDidHide", handleKeyboardHidden);

        return () => {
            Keyboard.removeListener("keyboardDidShow", handleKeyboardShown);
            Keyboard.removeListener("keyboardDidHide", handleKeyboardHidden);
        };
    }, []);
    const handleKeyboardShown = () => setKeyboardShown(true);
    const handleKeyboardHidden = () => setKeyboardShown(false);

    const theme = useTheme() as FullTheme;
    const { t } = useTranslation();
    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator
                initialRouteName={START_SCREEN}
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
                    activeTintColor: "white",
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
        </NavigationContainer>
    );
};

export default NavigationApp;
