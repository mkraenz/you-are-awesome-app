import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import HomeScreen from "../../src/screens/HomeScreen";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const store = createMockStore([])({
        posts: {
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
                <PaperProvider theme={DefaultTheme}>
                    <TestLocalizationProvider>
                        <HomeScreen />
                    </TestLocalizationProvider>
                </PaperProvider>
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

// TODO test interactivity
