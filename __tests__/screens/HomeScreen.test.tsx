import { fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import HomeScreen from "../../src/screens/HomeScreen";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const ConfiguredHomeScreen = () => (
    <LocalizedMockPaperProvider>
        <HomeScreen />
    </LocalizedMockPaperProvider>
);

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

it.skip("opens the feedback/bug dialog when clicking the bug button in the appbar", async () => {
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

    await findByText(i18next.t("bugReportTitle"));
    await findByText(i18next.t("bugReportDescription"));
});
