import React from "react";
import { Provider } from "react-redux";
import AppStateChangedContainer from "./AppStateChangedContainer";
import NavigationAppContainer from "./NavigationAppContainer";
import NetInfoChangedContainer from "./NetInfoChangedContainer";
import store from "./redux";

const App = () => (
    <Provider store={store}>
        <AppStateChangedContainer>
            <NetInfoChangedContainer>
                <NavigationAppContainer />
            </NetInfoChangedContainer>
        </AppStateChangedContainer>
    </Provider>
);

export default App;
