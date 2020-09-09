import { noop } from "lodash";
import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";
import TermsAndConditions from "../../../src/components/contribution/TermsAndConditions";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

it("renders correctly", async () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <TermsAndConditions accepted error={false} handlePress={noop} />
            </LocalizedMockPaperProvider>
        )
        .toJSON();
    await act(async () => {});

    expect(tree).toMatchSnapshot();
    expect(JSON.stringify(tree)).not.toContain(""); // empty checkbox
});

it("renders correctly on error", async () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <TermsAndConditions accepted={false} error handlePress={noop} />
            </LocalizedMockPaperProvider>
        )
        .toJSON();
    await act(async () => {});

    expect(tree).toMatchSnapshot();
    expect(JSON.stringify(tree)).toContain(""); // empty checkbox
});
