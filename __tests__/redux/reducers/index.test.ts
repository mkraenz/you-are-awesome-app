import { createStore } from "redux";
import rootReducer from "../../../src/redux/reducers";
import { internetConnectedReducer } from "../../../src/redux/reducers/internetConnectedReducer";
import { postReducer } from "../../../src/redux/reducers/postReducer";
import { sendPostReducer } from "../../../src/redux/reducers/sendPostReducer";
import { settingsReducer } from "../../../src/redux/reducers/settingsReducer";

it("can create a store with the rootReducer", () => {
    const store = createStore(rootReducer);
    const state = store.getState();

    expect(state.app).toEqual(postReducer(undefined, {} as any));
    expect(state.networking).toEqual(sendPostReducer(undefined, {} as any));
    expect(state.settings).toEqual(settingsReducer(undefined, {} as any));
    expect(state.netInfo).toEqual(
        internetConnectedReducer(undefined, {} as any)
    );
    expect(Object.keys(state)).toEqual([
        "app",
        "networking",
        "netInfo",
        "settings",
    ]);
});
