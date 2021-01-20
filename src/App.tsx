import React from "react";
import "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { initSentry } from "./api/Sentry";
import AppStateChangedContainer from "./app-containers/AppStateChangedContainer";
import NetInfoChangedContainer from "./app-containers/NetInfoChangedContainer";
import { CONFIG } from "./config";
import "./localization/i18n";
import { persistor, store } from "./state/store";
import ThemedApp from "./themes/ThemedApp";
import { jsBuildNumber } from "./utils/version.json";

initSentry(CONFIG.sentry, jsBuildNumber);

export default function App() {
    return (
        <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NetInfoChangedContainer>
                    <AppStateChangedContainer>
                        <ThemedApp />
                    </AppStateChangedContainer>
                </NetInfoChangedContainer>
            </PersistGate>
        </StoreProvider>
    );
}
