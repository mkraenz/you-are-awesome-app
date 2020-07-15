import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import SettingsScreen from "../../src/screens/SettingsScreen";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

const _Date = Date;

const mockGlobalDate = (nowMock: Date) => {
    global.Date = jest.fn(() => nowMock) as any;
    global.Date.UTC = _Date.UTC;
    global.Date.now = _Date.now;
    expect(new Date().getTime()).toBe(nowMock.getTime());
};

afterEach(() => (global.Date = _Date));

const ConfiguredSettingsScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <SettingsScreen />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders correctly for disabled notifications", () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    mockGlobalDate(scheduledTime);

    const store = createMockStore([])({
        app: {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: scheduledTime,
        },
        network: {
            connected: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredSettingsScreen />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders correctly for enabled notifications", () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    mockGlobalDate(scheduledTime);

    const store = createMockStore([])({
        app: {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: scheduledTime,
        },
        network: {
            connected: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredSettingsScreen />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("displays netinfo box for no internet connection", () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    mockGlobalDate(scheduledTime);

    const store = createMockStore([])({
        app: {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: scheduledTime,
        },
        network: {
            connected: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredSettingsScreen />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
