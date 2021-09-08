import { fireEvent, render } from "@testing-library/react-native";
import Clipboard from "expo-clipboard";
import i18next from "i18next";
import MockDate from "mockdate";
import React from "react";
import "react-native";
import {
    LongPressGestureHandler,
    TapGestureHandler,
} from "react-native-gesture-handler";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import HomeScreen from "../../src/screens/HomeScreen";
import { ActionType } from "../../src/state/actions/ActionType";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const ConfiguredHomeScreen = () => (
    <LocalizedMockPaperProvider>
        <HomeScreen />
    </LocalizedMockPaperProvider>
);

afterEach(() => {
    MockDate.reset();
});

it("renders correctly", () => {
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredHomeScreen />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("requests to fetch messages", async () => {
    MockDate.set("2021-01-01T00:00:00.000Z");
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );
    expect(store.getActions()).toEqual([
        {
            type: ActionType.FetchMessagesRequested,
            payload: {
                now: new Date("2021-01-01T00:00:00.000Z"),
            },
        },
    ]);
});

it("opens the report dialog when clicking the flag button in the appbar", async () => {
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    const { findByTestId, findByText, findAllByText, queryByText, ...tree } =
        render(
            <Provider store={store}>
                <ConfiguredHomeScreen />
            </Provider>
        );

    const dialogNotRenderedYet = queryByText(i18next.t("reportTitle")) === null;
    expect(dialogNotRenderedYet).toBe(true);

    const reportButton = await findByTestId("appbar-action-item-right");
    fireEvent.press(reportButton);

    await findByText(i18next.t("reportTitle"));
    const reportReasons = await findAllByText(i18next.t("reportReason"));
    expect(reportReasons).toHaveLength(3);
});

it("opens the feedback/bug dialog when clicking the bug button in the appbar", async () => {
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    const { findByText, queryByText, findByA11yLabel } = render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );

    const dialogNotRenderedYet = queryByText(i18next.t("reportTitle")) === null;
    expect(dialogNotRenderedYet).toBe(true);

    const reportButton = await findByA11yLabel("report a bug");
    fireEvent.press(reportButton);

    await findByText(i18next.t("bugReport:title"));
    await findByText(i18next.t("bugReport:description"));
});

it("copies the message to clipboard and notifies the user on long press", async () => {
    jest.useFakeTimers();
    const clipboardSpy = jest.spyOn(Clipboard, "setString");
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    const { getByA11yLabel, getByText } = render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );
    const quoteView = getByA11yLabel(
        "long press to copy message, double tap to add to favorites"
    );
    const longPressGestureHandler = quoteView.parent!.parent!;

    // simulates successful long press
    fireEvent(longPressGestureHandler, "onActivated");

    expect(longPressGestureHandler.type).toEqual(LongPressGestureHandler);
    expect(getByText(i18next.t("home:copiedInfo"))).toBeTruthy();
    expect(clipboardSpy).toHaveBeenCalledWith(
        "my-text - my-author from my-country - via You are Awesome App!"
    );
});

it("adds the message to favorites on double tap", async () => {
    jest.useFakeTimers();
    const store = createMockStore<
        Pick2<IState, "messages", "currentMessage"> &
            Pick2<IState, "network", "connected">
    >([])({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
        },
        network: {
            connected: true,
        },
    });

    const { getByA11yLabel } = render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );
    const quoteView = getByA11yLabel(
        "long press to copy message, double tap to add to favorites"
    );

    const doubleTap = quoteView.parent!.parent!.parent!;

    // simulates successful double tap
    fireEvent(doubleTap, "onActivated");

    expect(doubleTap.type).toEqual(TapGestureHandler);
    expect(store.getActions()[1]).toEqual({
        type: ActionType.AddToFavorites,
        payload: {
            id: "1",
            author: "my-author",
            text: "my-text",
            country: "my-country",
            isodate: "2018-08-20",
        },
    });
});
