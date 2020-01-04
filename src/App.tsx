import React from "react";
import { Provider } from "react-redux";
import AppStateChangedContainer from "./AppStateChangedContainer";
import NetInfoChangedContainer from "./NetInfoChangedContainer";
import store from "./redux";

const App = () => (
    <Provider store={store}>
        <AppStateChangedContainer>
            <NetInfoChangedContainer />
        </AppStateChangedContainer>
    </Provider>
);

export default App;
