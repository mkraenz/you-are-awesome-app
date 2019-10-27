import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { default as createMockStore } from "redux-mock-store";
import ContributionPage from "../../src/pages/ContributionPage";

it("renders correctly", () => {
    const store = createMockStore([])({
        netInfo: {
            connected: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ContributionPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders no connection notify if disconnected from internet", () => {
    const store = createMockStore([])({
        netInfo: {
            connected: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ContributionPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
    // TODO expect No internet connection
});
