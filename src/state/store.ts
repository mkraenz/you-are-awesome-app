import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PersistConfig,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import { IsoStringToDateTransform } from "./persistence/DateTransform";
import { rootReducer, _RootState } from "./reducers";
import rootSaga from "./sagas";
import { IState } from "./state/IState";

const DEBUG = false;

const logger =
    (store: any) =>
    (next: any) =>
    (action: any): any => {
        console.group(action.type);
        console.info("action type: ", action.type);
        console.info("dispatching ", action);
        const result = next(action);
        console.log("next state", store.getState());
        console.groupEnd();
        return result;
    };

const whitelist: (keyof IState)[] = ["app", "favorites", "contributions"];
const persistConfig: PersistConfig<_RootState> = {
    key: "root",
    storage: AsyncStorage,
    transforms: [IsoStringToDateTransform],
    debug: DEBUG,
    whitelist,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
            thunk: false,
        }).concat(sagaMiddleware);

        return middleware;
    },
    devTools: false,
});

let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
