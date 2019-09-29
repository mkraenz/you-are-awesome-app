import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { awesomeTexts, randomAwesomeText } from "./src/content/awesomeTexts";
import NavigationAppContainer from "./src/NavigationAppContainer";
import { ReduxAction } from "./src/pages/ReduxAction";

const currentAwesomeText = randomAwesomeText();

const reducer = (
    state = { awesomeTexts, currentAwesomeText },
    action: { type: ReduxAction; payload: { text: string } }
) => {
    switch (action.type) {
        case ReduxAction.AddAwesomeText:
            return {
                awesomeTexts: [...awesomeTexts, action.payload.text],
                currentAwesomeText: action.payload.text,
            };
        case ReduxAction.SetAwesomeText:
            return {
                currentAwesomeText: action.payload.text,
            };
    }
    return state;
};
const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <NavigationAppContainer />
    </Provider>
);

export default App;
