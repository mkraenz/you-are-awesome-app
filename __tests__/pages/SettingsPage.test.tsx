import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { default as createMockStore } from "redux-mock-store";
import SettingsPage from "../../src/pages/SettingsPage";

it("renders correctly for notificationsEnabled=false", () => {
    const store = createMockStore([])({
        settings: {
            notificationsEnabled: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <SettingsPage />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
