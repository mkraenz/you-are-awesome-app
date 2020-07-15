import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import AddPostInputs from "../../../src/components/contribution/AddPostInputs";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const store = createMockStore([])({
        network: {
            connectedToInternet: true,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <TestLocalizationProvider>
                    <AddPostInputs handleSubmit={() => undefined} />
                </TestLocalizationProvider>
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
