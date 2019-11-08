import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import NotificationsEnabledCheckbox from "../../../src/pages/components/NotificationsEnabledCheckbox";

it("renders correctly for disabled", () => {
    const scheduledTime = new Date("2029-09-06T15:00:00.000Z");
    const store = createMockStore([])({
        settings: {
            notificationsEnabled: false,
            scheduledTime,
        },
    });
    const tree = renderer
        .create(
            <Provider store={store}>
                <NotificationsEnabledCheckbox />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders correctly for enabled", () => {
    const scheduledTime = new Date("2029-09-06T15:00:00.000Z");
    const store = createMockStore([])({
        settings: {
            notificationsEnabled: true,
            scheduledTime,
        },
    });
    const tree = renderer
        .create(
            <Provider store={store}>
                <NotificationsEnabledCheckbox />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
