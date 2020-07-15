import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import ContributionScreen from "../../src/screens/ContributionScreen";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

const ConfiguredContributionScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <ContributionScreen />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders correctly", () => {
    const store = createMockStore([])({
        network: {
            connectedToInternet: true,
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
});

it("renders no connection notify if disconnected from internet", () => {
    const store = createMockStore([])({
        network: {
            connectedToInternet: false,
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
    // TODO expect No internet connection
});
