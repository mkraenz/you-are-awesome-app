import { act as actTL, fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import MockDate from "mockdate";
import React, { FC } from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";
import createMockStore from "redux-mock-store";
import { Route } from "../../src/navigation/Route";
import ContributionScreen from "../../src/screens/ContributionScreen";
import { ActionType } from "../../src/state/actions/ActionType";
import { ISubmitMessageRequested } from "../../src/state/actions/SubmitMessageAction";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";
import MockedNavigator from "../helpers/MockedNavigation";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("expo-firebase-analytics", () => ({ logEvent: jest.fn() }));

const ConfiguredContributionScreen: FC = () => (
    <LocalizedMockPaperProvider>
        <MockedNavigator
            component={ContributionScreen}
            name={Route.MyContributions}
        />
    </LocalizedMockPaperProvider>
);

afterEach(() => {
    MockDate.reset();
});

it("renders correctly", async () => {
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
    await act(async () => {});

    expect(JSON.stringify(tree)).not.toContain(i18next.t("noInternet"));
    expect(tree).toMatchSnapshot();
});

it("renders no connection notify if disconnected from internet", async () => {
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
    await act(async () => {});

    expect(tree).toMatchSnapshot();
    expect(JSON.stringify(tree)).toContain(i18next.t("noInternet"));
});

it("can fill the form and submits it to the store", async () => {
    MockDate.set("2002-02-20T20:20:02Z");
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: false,
        },
    });

    const { findAllByText, getByText, getByTestId } = render(
        <Provider store={store}>
            <ConfiguredContributionScreen />
        </Provider>
    );
    await actTL(async () => {});

    const countryInputs = await findAllByText(i18next.t("contributeCountry"));
    const awesomeInputs = await findAllByText(
        i18next.t("contributeAwesomeMessage")
    );
    const authorInputs = await findAllByText(i18next.t("contributeName"));
    const consentCheckbox = getByTestId(
        "terms-and-conditions-consent-checkbox"
    );
    fireEvent.changeText(countryInputs[0], "Wonderland");
    fireEvent.changeText(awesomeInputs[0], "You are soooo awesome!");
    fireEvent.changeText(authorInputs[0], "Winnie the Puuh");
    fireEvent.press(consentCheckbox);
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
            isodate: "2002-02-20",
        },
    };
    expect(store.getActions()).toContainEqual(expected);
});
