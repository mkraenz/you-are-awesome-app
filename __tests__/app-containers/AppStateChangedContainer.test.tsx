import { render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { AppState, AppStateStatus } from "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import createMockStore from "redux-mock-store";
import AppStateChangedContainer from "../../src/app-containers/AppStateChangedContainer";
import { ActionType } from "../../src/state/actions/ActionType";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";

type RelevantState = Pick2<IState, "messages", "lastUpdate">;

const renderComponent = (store: Store) => {
    return render(
        <Provider store={store}>
            <AppStateChangedContainer />
        </Provider>
    );
};

it("requests to fetch messages if not up-to-date when the app is brought into foreground", async () => {
    const longAgo = new Date(0);
    const store = createMockStore<RelevantState>([])({
        messages: {
            lastUpdate: longAgo,
        },
    });
    let registeredListener: ((state: AppStateStatus) => void) | undefined =
        undefined;
    const spy = jest
        .spyOn(AppState, "addEventListener")
        .mockImplementation((type, listener) => {
            registeredListener = listener;
        });

    renderComponent(store);

    expect(spy).toHaveBeenCalledWith("change", expect.any(Function));
    expect(registeredListener).toBeDefined();

    // @ts-ignore somehow TS thinks listener is only of type undefined
    registeredListener("active");

    expect(store.getActions()).toEqual([
        {
            type: ActionType.FetchMessagesRequested,
            payload: {
                now: expect.any(Date),
            },
        },
    ]);
});

it("does nothing if not brought to foregound", async () => {
    const longAgo = new Date(0);
    const store = createMockStore<RelevantState>([])({
        messages: {
            lastUpdate: longAgo,
        },
    });
    let registeredListener: ((state: AppStateStatus) => void) | undefined =
        undefined;
    const spy = jest
        .spyOn(AppState, "addEventListener")
        .mockImplementation((type, listener) => {
            registeredListener = listener;
        });

    renderComponent(store);

    expect(spy).toHaveBeenCalledWith("change", expect.any(Function));
    expect(registeredListener).toBeDefined();

    // @ts-ignore somehow TS thinks listener is only of type undefined
    registeredListener("background");

    expect(store.getActions()).toEqual([]);
});
