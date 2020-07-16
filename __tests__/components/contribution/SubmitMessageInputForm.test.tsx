import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import createMockStore from "redux-mock-store";
import SubmitMessageInputForm from "../../../src/components/contribution/SubmitMessageInputForm";
import { IState } from "../../../src/state/state/IState";
import { Pick2 } from "../../../src/utils/ts/Pick2";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <TestLocalizationProvider>
                    <SubmitMessageInputForm handleSubmit={() => undefined} />
                </TestLocalizationProvider>
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
