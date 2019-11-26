import React from "react";
import { Provider } from "react-redux";
import AppStateChangedContainer from "./AppStateChangedContainer";
import store from "./redux";

const App = () => (
    <Provider store={store}>
        <AppStateChangedContainer />
    </Provider>
);

export default App;
