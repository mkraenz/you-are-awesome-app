import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import NavigationAppContainer from "./src/NavigationAppContainer";
import { reducer } from "./src/redux/reducer";

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <NavigationAppContainer />
    </Provider>
);

export default App;
