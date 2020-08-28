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
