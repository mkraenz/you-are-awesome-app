import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import MyAppbar from "../../src/components/navigation/MyAppbar";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";

it("renders correctly without dark mode", () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <MyAppbar
                    title="my-title"
                    onBugActionPress={noop}
                    bugReportIconVisible={false}
                />
            </LocalizedMockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
