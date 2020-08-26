import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import { IsoStringToDateTransform } from "./persistence/DateTransform";
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";
import { IState } from "./state/IState";

const DEBUG = false;

const whitelist: (keyof IState)[] = ["app", "favorites"];
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    transforms: [IsoStringToDateTransform],
    debug: DEBUG,
    whitelist,
    stateReconciler: autoMergeLevel2,
};

// TODO fix ts error
const persistedReducer = persistReducer(persistConfig, rootReducer as any);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
