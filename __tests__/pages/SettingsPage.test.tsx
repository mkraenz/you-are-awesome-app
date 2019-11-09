import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { default as createMockStore } from "redux-mock-store";
import SettingsPage from "../../src/pages/SettingsPage";

const _Date = Date;

const mockGlobalDate = (nowMock: Date) => {
    global.Date = jest.fn(() => nowMock) as any;
    global.Date.UTC = _Date.UTC;
    expect(new Date().getTime()).toBe(nowMock.getTime());
};

afterEach(() => {
    global.Date = _Date;
});

it("renders correctly for disabled notifications", () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T15:00:00.000Z");
    mockGlobalDate(scheduledTime);

    const store = createMockStore([])({
        settings: {
            notificationsEnabled: false,
            scheduledTime,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <SettingsPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders correctly for enabled notifications", () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T15:00:00.000Z");
    mockGlobalDate(scheduledTime);

    const store = createMockStore([])({
        settings: {
            notificationsEnabled: true,
            scheduledTime,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <SettingsPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
