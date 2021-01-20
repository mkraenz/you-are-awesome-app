import React from "react";
import "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppStateChangedContainer from "./app-containers/AppStateChangedContainer";
import NetInfoChangedContainer from "./app-containers/NetInfoChangedContainer";
import "./localization/i18n";
import { persistor, store } from "./state/store";
import ThemedApp from "./themes/ThemedApp";

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
