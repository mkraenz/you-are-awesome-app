import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import NavigationAppContainer from "./src/NavigationAppContainer";
import { reducer } from "./src/redux/reducer";
import sendPostSaga from "./src/redux/sendPostSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sendPostSaga);

const App = () => (
    <Provider store={store}>
        <NavigationAppContainer />
    </Provider>
);

export default App;
