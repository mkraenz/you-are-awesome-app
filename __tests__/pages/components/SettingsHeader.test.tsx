import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import SettingsHeader from "../../../src/pages/components/SettingsHeader";

it("renders correctly", () => {
    const tree = renderer
        .create(<SettingsHeader navigation={{} as any} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
