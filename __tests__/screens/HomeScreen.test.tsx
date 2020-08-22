import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import HomeScreen from "../../src/screens/HomeScreen";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

const ConfiguredHomeScreen = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <HomeScreen />
        </TestLocalizationProvider>
    </PaperProvider>
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
