import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";
import createMockStore from "redux-mock-store";
import ContributionInputForm from "../../../src/components/contribution/ContributionInputForm";
import { IState } from "../../../src/state/state/IState";
import { Pick2 } from "../../../src/utils/ts/Pick2";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

jest.mock("react-native/Libraries/Animated/Easing");
jest.mock("react-native/Libraries/Animated/animations/TimingAnimation");

it("renders correctly", async () => {
    const store = createMockStore<Pick2<IState, "network", "connected">>([])({
        network: {
            connected: false,
        },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <TestLocalizationProvider>
                    <ContributionInputForm handleSubmit={() => undefined} />
                </TestLocalizationProvider>
            </Provider>
        )
        .toJSON();
    await act(async () => {});

    expect(tree).toMatchSnapshot();
});
