import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import NavigationAppContainer from "./src/NavigationAppContainer";
import combinedReducers from "./src/redux/reducers";
import sendPostSaga from "./src/redux/sendPostSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sendPostSaga);

const App = () => (
    <Provider store={store}>
        <NavigationAppContainer />
    </Provider>
);

export default App;
