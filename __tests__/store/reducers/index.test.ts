import { createStore } from "redux";
import { rootReducer } from "../../../src/state/reducers";
import { appReducer } from "../../../src/state/reducers/appReducer";
import { networkReducer } from "../../../src/state/reducers/networkReducer";
import { messageReducer } from "../../../src/state/reducers/messageReducer";
import { submitMessageReducer } from "../../../src/state/reducers/sendPostReducer";
import { IState } from "../../../src/state/state/IState";

it("can create a store with the rootReducer", () => {
    const store = createStore(rootReducer);
    const state = store.getState();

    expect(state.messages).toEqual(messageReducer(undefined, {} as any));
    expect(state.submitMessage).toEqual(
        submitMessageReducer(undefined, {} as any)
    );
    expect(state.network).toEqual(networkReducer(undefined, {} as any));
    expect(state.app).toEqual(appReducer(undefined, {} as any));
    const expectedKeys: Array<keyof IState> = [
        "messages",
        "app",
        "network",
        "submitMessage",
    ];
    expect(Object.keys(state)).toEqual(expectedKeys);
});
