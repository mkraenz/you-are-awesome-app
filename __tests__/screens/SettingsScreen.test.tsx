import { advanceTo, clear as resetDateMock } from "jest-date-mock";
import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";
import createMockStore from "redux-mock-store";
import SettingsScreen from "../../src/screens/SettingsScreen";
import MockedNavigator from "../helpers/MockedNavigation";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

afterEach(() => {
    resetDateMock();
});

const ConfiguredSettingsScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <MockedNavigator component={SettingsScreen} />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders correctly for disabled notifications", async () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    advanceTo(scheduledTime);

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
    // WORKAROUND: fix https://stackoverflow.com/questions/61695139/async-testing-react-navigation-5-in-jest-navigationcontainer-causes-console-err
    await act(async () => {});

    expect(tree).toMatchSnapshot();
});

it("renders correctly for enabled notifications", async () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    advanceTo(scheduledTime);

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
    await act(async () => {});

    expect(tree).toMatchSnapshot();
});

it("displays netinfo box for no internet connection", async () => {
    // far in the future so that the snapshot does not change
    const scheduledTime = new Date("2029-09-06T21:00:00.000Z");
    advanceTo(scheduledTime);

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
    await act(async () => {});

    expect(tree).toMatchSnapshot();
});
