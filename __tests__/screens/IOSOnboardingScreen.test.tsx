import { fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import React from "react";
import "react-native";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import IOSOnboardingScreen from "../../src/screens/IOSOnboardingScreen";
import { ActionType } from "../../src/state/actions/ActionType";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";

it("shows the app name and a button to the next page", () => {
    const store = createMockStore([])({});

    const { getByText } = render(
        <Provider store={store}>
            <LocalizedMockPaperProvider>
                <IOSOnboardingScreen />
            </LocalizedMockPaperProvider>
        </Provider>
    );

    expect(getByText(i18next.t("onboarding:welcomeTitle"))).toBeDefined();
    expect(getByText(i18next.t("onboarding:next"))).toBeDefined();
});

// no integration test of switching from page 1 to page 2 because of bug in RN-onboarding-swiper and flatlist

it("page 2 shows push notifications and Done button sends ToggleOnboardingAction", () => {
    const store = createMockStore([])({
        app: {
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: new Date(),
        },
        network: {
            connected: true,
        },
    });

    const { getByText, getByA11yRole } = render(
        <Provider store={store}>
            <LocalizedMockPaperProvider>
                <IOSOnboardingScreen onlyRenderPage={1} />
            </LocalizedMockPaperProvider>
        </Provider>
    );

    expect(getByText(i18next.t("onboarding:pushNotifsTitle"))).toBeDefined();
    expect(getByText(i18next.t("onboarding:done"))).toBeDefined();
    const button = getByA11yRole("button");
    fireEvent.press(button);

    expect(store.getActions()).toEqual([
        {
            type: ActionType.ToggleOnboardingCompleted,
        },
    ]);
});
