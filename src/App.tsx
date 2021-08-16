import React from "react";
import "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { initSentry } from "./api/Sentry";
import AppStateChangedContainer from "./app-containers/AppStateChangedContainer";
import NetInfoChangedContainer from "./app-containers/NetInfoChangedContainer";
import OnboardingContainer from "./app-containers/OnboardingContainer";
import { CONFIG } from "./config";
import "./localization/i18n";
import LocalizationProvider from "./localization/LocalizationProvider";
import NavigationApp from "./navigation/NavigationApp";
import { persistor, store } from "./state/store";
import ThemeProvider from "./themes/ThemeProvide";
import { jsBuildNumber } from "./utils/version.json";

initSentry(CONFIG.sentry, jsBuildNumber);

export default function App() {
    return (
        <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NetInfoChangedContainer />
                <AppStateChangedContainer />
                <OnboardingContainer />
                <LocalizationProvider>
                    <ThemeProvider>
                        <NavigationApp />
                    </ThemeProvider>
                </LocalizationProvider>
            </PersistGate>
        </StoreProvider>
    );
}
