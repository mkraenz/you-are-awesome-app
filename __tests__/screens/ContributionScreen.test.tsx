import { fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import ContributionScreen from "../../src/screens/ContributionScreen";
import { ActionType } from "../../src/state/actions/ActionType";
import { ISubmitMessageRequested } from "../../src/state/actions/SubmitMessageAction";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

const ConfiguredContributionScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <ContributionScreen />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders correctly", () => {
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredContributionScreen />
            </Provider>
        )
        .toJSON();

    expect(JSON.stringify(tree)).not.toContain(i18next.t("noInternet"));
    expect(tree).toMatchSnapshot();
});

it("renders no connection notify if disconnected from internet", () => {
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredContributionScreen />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
    expect(JSON.stringify(tree)).toContain(i18next.t("noInternet"));
});

it("can fill the form and submits it to the store", async () => {
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: false,
        },
    });

    const { findAllByText, getByText } = render(
        <Provider store={store}>
            <ConfiguredContributionScreen />
        </Provider>
    );

    const countryInputs = await findAllByText(i18next.t("contributeCountry"));
    const awesomeInputs = await findAllByText(
        i18next.t("contributeAwesomeMessage")
    );
    const authorInputs = await findAllByText(i18next.t("contributeName"));
    fireEvent.changeText(countryInputs[0], "Wonderland");
    fireEvent.changeText(awesomeInputs[0], "You are soooo awesome!");
    fireEvent.changeText(authorInputs[0], "Winnie the Puuh");
    fireEvent.press(getByText(i18next.t("contributeSubmit")));

    const v4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const expected: ISubmitMessageRequested = {
        type: ActionType.SubmitMessageRequested,
        payload: {
            author: "Winnie the Puuh",
            country: "Wonderland",
            text: "You are soooo awesome!",
            id: expect.stringMatching(v4),
        },
    };
    expect(store.getActions()).toContainEqual(expected);
});
