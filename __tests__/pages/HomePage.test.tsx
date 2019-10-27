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
        netInfo: {
            connected: true,
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

it("renders no connection notify if disconnected from internet", () => {
    const store = createMockStore([])({
        app: {
            currentPost: {
                id: 1,
                author: "",
                text: "Loading...",
                country: "",
            },
        },
        netInfo: {
            connected: false,
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
    // TODO expect No internet connection
});

// TODO test interactivity
