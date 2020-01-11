import React from "react";
import { Provider } from "react-redux";
import AppStateChangedContainer from "./AppStateChangedContainer";
import NavigationAppContainer from "./NavigationAppContainer";
import NetInfoChangedContainer from "./NetInfoChangedContainer";
import ReceivePushNotificationsContainer from "./ReceivePushNotificationsContainer";
import store from "./redux";

const App = () => (
    <Provider store={store}>
        <AppStateChangedContainer>
            <NetInfoChangedContainer>
                <ReceivePushNotificationsContainer>
                    <NavigationAppContainer />
                </ReceivePushNotificationsContainer>
            </NetInfoChangedContainer>
        </AppStateChangedContainer>
    </Provider>
);

export default App;
