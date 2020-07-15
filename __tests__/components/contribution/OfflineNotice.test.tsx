import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import OfflineNotice from "../../../src/components/common/OfflineNotice";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <TestLocalizationProvider>
                <OfflineNotice />
            </TestLocalizationProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
