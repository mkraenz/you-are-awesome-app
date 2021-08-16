import { render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import createMockStore from "redux-mock-store";
import OnboardingContainer from "../../src/app-containers/OnboardingContainer";
import { ActionType } from "../../src/state/actions/ActionType";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";

type RelevantState = Pick2<
    IState,
    "app",
    "onboardingCompleted" | "pushNotificationsEnabled"
> &
    Pick2<IState, "network", "connected">;

const renderComponent = (store: Store) => {
    return render(
        <Provider store={store}>
            <OnboardingContainer />
        </Provider>
    );
};

it("registers for push notifications and ends the onboarding", async () => {
    const store = createMockStore<RelevantState>([])({
        app: {
            pushNotificationsEnabled: false,
            onboardingCompleted: false,
        },
        network: {
            connected: true,
        },
    });

    const { getByText } = renderComponent(store);

    expect(store.getActions()).toEqual([
        {
            type: ActionType.SetPushNotificationsState,
            payload: {
                enabled: true,
                scheduledTime: expect.any(Date),
            },
        },
        { type: "ToggleOnboardingCompleted" },
    ]);
});

it("does nothing if onboarding is completed", async () => {
    const store = createMockStore<RelevantState>([])({
        app: {
            pushNotificationsEnabled: false,
            onboardingCompleted: true,
        },
        network: {
            connected: true,
        },
    });

    renderComponent(store);

    expect(store.getActions()).toEqual([]);
});

it("does nothing if push notificatiosn already enabled", async () => {
    // Note: this should not happen in reality
    const store = createMockStore<RelevantState>([])({
        app: {
            pushNotificationsEnabled: true,
            onboardingCompleted: false,
        },
        network: {
            connected: true,
        },
    });

    renderComponent(store);

    expect(store.getActions()).toEqual([]);
});

it("does nothing if not connected to internet", async () => {
    // Note: this should not happen in reality
    const store = createMockStore<RelevantState>([])({
        app: {
            pushNotificationsEnabled: false,
            onboardingCompleted: false,
        },
        network: {
            connected: false,
        },
    });

    renderComponent(store);

    expect(store.getActions()).toEqual([]);
});
