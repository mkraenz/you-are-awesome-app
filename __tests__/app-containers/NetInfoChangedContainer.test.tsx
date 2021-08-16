import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { render } from "@testing-library/react-native";
import { noop } from "lodash";
import React from "react";
import "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import createMockStore from "redux-mock-store";
import NetInfoChangedContainer from "../../src/app-containers/NetInfoChangedContainer";
import { ActionType } from "../../src/state/actions/ActionType";

const renderComponent = (store: Store) => {
    return render(
        <Provider store={store}>
            <NetInfoChangedContainer />
        </Provider>
    );
};

it("requests to fetch messages if not up-to-date when the app is brought into foreground", async () => {
    const store = createMockStore([])({});
    let registeredListener: ((state: NetInfoState) => void) | undefined;
    const spy = jest
        .spyOn(NetInfo, "addEventListener")
        .mockImplementation((listener) => {
            registeredListener = listener;
            return noop;
        });

    renderComponent(store);

    expect(spy).toHaveBeenCalledWith(expect.any(Function));
    expect(registeredListener).toBeDefined();

    if (!registeredListener) throw new Error("make TS happy");
    registeredListener({
        isConnected: true,
    } as unknown as NetInfoState);

    expect(store.getActions()).toEqual([
        {
            type: ActionType.NetInfoChanged,
            payload: {
                connected: true,
            },
        },
    ]);
});
