import { createStore } from "redux";
import { rootReducer } from "../../../src/state/reducers";
import { appReducer } from "../../../src/state/reducers/appReducer";
import { contributionsReducer } from "../../../src/state/reducers/contributionsReducer";
import messageReducer from "../../../src/state/reducers/messageReducer";
import { networkReducer } from "../../../src/state/reducers/networkReducer";
import { IState } from "../../../src/state/state/IState";

it("can create a store with the rootReducer", () => {
    const store = createStore(rootReducer);
    const state = store.getState();

    // @ts-expect-error
    expect(state.messages).toEqual(messageReducer(undefined, {}));
    expect(state.contributions).toEqual(
        // @ts-expect-error
        contributionsReducer(undefined, {})
    );
    // @ts-expect-error
    expect(state.network).toEqual(networkReducer(undefined, {}));
    // @ts-expect-error
    expect(state.app).toEqual(appReducer(undefined, {}));
    const expectedKeys: Array<keyof IState> = [
        "messages",
        "app",
        "network",
        "contributions",
        "favorites",
    ];
    expect(Object.keys(state)).toEqual(expectedKeys);
});
