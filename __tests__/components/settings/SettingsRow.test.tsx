import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import SettingsRow from "../../../src/components/settings/SettingsRow";

it("renders correctly", () => {
    const tree = renderer
        .create(<SettingsRow onPress={() => undefined} title={"MyTitle"} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
