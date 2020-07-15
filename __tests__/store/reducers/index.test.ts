import { createStore } from "redux";
import { rootReducer } from "../../../src/state/reducers";
import { appReducer } from "../../../src/state/reducers/appReducer";
import { networkReducer } from "../../../src/state/reducers/networkReducer";
import { postReducer } from "../../../src/state/reducers/postReducer";
import { sendPostReducer } from "../../../src/state/reducers/sendPostReducer";
import { IState } from "../../../src/state/state/IState";

it("can create a store with the rootReducer", () => {
    const store = createStore(rootReducer);
    const state = store.getState();

    expect(state.posts).toEqual(postReducer(undefined, {} as any));
    expect(state.sendPost).toEqual(sendPostReducer(undefined, {} as any));
    expect(state.network).toEqual(networkReducer(undefined, {} as any));
    expect(state.app).toEqual(appReducer(undefined, {} as any));
    const expectedKeys: Array<keyof IState> = [
        "posts",
        "app",
        "network",
        "sendPost",
    ];
    expect(Object.keys(state)).toEqual(expectedKeys);
});
