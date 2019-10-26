import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import HomePage from "../../src/pages/HomePage";

it("renders correctly", () => {
    const store = createMockStore([])({
        app: {
            currentPost: {
                id: 1,
                author: "my-author",
                text: "my-text",
                country: "my-country",
            },
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <HomePage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

// TODO test interactivity
