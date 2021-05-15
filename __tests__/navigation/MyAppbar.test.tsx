import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import MyAppbar from "../../src/components/navigation/MyAppbar";
import MockPaperProvider from "../helpers/MockPaperProvider";

it("renders correctly without dark mode", () => {
    const tree = renderer
        .create(
            <MockPaperProvider>
                <MyAppbar
                    title="my-title"
                    onBugActionPress={noop}
                    // TODO #430: Possibly the cause of failing tests on CI. Shows `...create-icon-set.js` error
                    bugReportIconVisible={false}
                />
            </MockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
