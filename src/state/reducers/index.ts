import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";
import { contributionsReducer } from "./contributionsReducer";
import { favoritesReducer } from "./favoritesReducer";
import messageReducer from "./messageReducer";
import { networkReducer } from "./networkReducer";

const reducers = {
    messages: messageReducer,
    app: appReducer,
    network: networkReducer,
    contributions: contributionsReducer,
    favorites: favoritesReducer,
};
export const rootReducer = combineReducers(reducers);

/** @deprecated This is a workaround for redux-persist. Except for typing redux-persist in store.ts, always use RootState exported from store.ts. */
export type _RootState = {
    [K in keyof typeof reducers]: ReturnType<typeof reducers[K]>;
};
