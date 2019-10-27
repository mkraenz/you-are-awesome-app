import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import OfflineNotice from "../../../src/pages/components/OfflineNotice";

it("renders correctly", () => {
    const tree = renderer.create(<OfflineNotice />).toJSON();
    expect(tree).toMatchSnapshot();
});
