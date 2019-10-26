import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import AppStateChangedContainer from "./AppStateChangedContainer";
import combinedReducers from "./redux/reducers";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => (
    <Provider store={store}>
        <AppStateChangedContainer />
    </Provider>
);

export default App;
