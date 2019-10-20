import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { default as createMockStore } from "redux-mock-store";
import ContributionPage from "../../src/pages/ContributionPage";

it("renders correctly", () => {
    const store = createMockStore([])({});

    const tree = renderer
        .create(
            <Provider store={store}>
                <ContributionPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
