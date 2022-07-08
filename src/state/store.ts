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

const whitelist: (keyof IState)[] = ["app", "favorites", "contributions"];
const persistConfig = {
    key: "root",
    // TODO expo 45
    // AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storag
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
