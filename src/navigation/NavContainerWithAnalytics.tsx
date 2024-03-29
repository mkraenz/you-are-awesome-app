import {
    NavigationContainer,
    NavigationContainerRef,
} from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { Analytics as FAnalytics } from "../api/Analytics";
import { CONFIG } from "../config";
import { FullTheme } from "../themes/theme";

/** following https://reactnavigation.org/docs/screen-tracking/ */
const NavContainerWithAnalytics: FC = ({ children }) => {
    const routeNameRef = React.useRef<string>(null);
    const navigationRef = React.useRef<NavigationContainerRef>(null);
    const theme = useTheme() as FullTheme;

    if (!CONFIG.isProdOrStage) {
        Analytics.setDebugModeEnabled(CONFIG.debugAnalytics);
    }
    return (
        <NavigationContainer
            theme={theme}
            ref={navigationRef}
            onReady={() => {
                const currentRoute = navigationRef.current!.getCurrentRoute();
                (routeNameRef as any).current = currentRoute!.name;
            }}
            onStateChange={() => {
                if (CONFIG.featureFlags.analytics) {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName =
                        navigationRef.current!.getCurrentRoute()!.name;

                    if (previousRouteName !== currentRouteName) {
                        FAnalytics.logScreenView(currentRouteName);
                    }

                    (routeNameRef as any).current = currentRouteName;
                }
            }}
        >
            {children}
        </NavigationContainer>
    );
};

export default NavContainerWithAnalytics;
