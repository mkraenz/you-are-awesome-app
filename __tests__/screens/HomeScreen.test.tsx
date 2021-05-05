import { act, fireEvent, render } from "@testing-library/react-native";
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
    const store = createMockStore<Pick2<IState, "messages", "currentMessage">>(
        []
    )({
        messages: {
            currentMessage: {
                id: "1",
                author: "my-author",
                text: "my-text",
                country: "my-country",
                isodate: "2018-08-20",
            },
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

it.skip("opens the report dialog when clicking the flag button in the appbar", async () => {
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

    const { findByTestId, ...tree } = render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );
    await act(async () => {});

    const reportButton = await findByTestId("appbar-action-item-right");
    fireEvent.press(reportButton);
    await act(async () => {});

    const dialogTree = ((tree.toJSON() as unknown) as renderer.ReactTestRendererJSON[])[2];
    expect(JSON.stringify(dialogTree)).toContain(i18next.t("reportTitle"));
    expect(JSON.stringify(dialogTree)).toContain(i18next.t("reportReason"));
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

    const { findByA11yLabel, ...tree } = render(
        <Provider store={store}>
            <ConfiguredHomeScreen />
        </Provider>
    );
    await act(async () => {});

    const reportButton = await findByA11yLabel("report a bug");
    fireEvent.press(reportButton);
    await act(async () => {});

    const dialogTree = ((tree.toJSON() as unknown) as renderer.ReactTestRendererJSON[])[1];
    expect(JSON.stringify(dialogTree)).toContain(i18next.t("bugReportTitle"));
    expect(JSON.stringify(dialogTree)).toContain(
        i18next.t("bugReportDescription")
    );
});
