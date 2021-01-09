import { render } from "@testing-library/react-native";
import { noop } from "lodash";
import React from "react";
import "react-native";
import TermsAndConditions from "../../../src/components/contribution/TermsAndConditions";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

it("renders correctly on accepted", async () => {
    const { findByA11yRole, ...tree } = render(
        <LocalizedMockPaperProvider>
            <TermsAndConditions accepted error={false} handlePress={noop} />
        </LocalizedMockPaperProvider>
    );

    const checkbox = await findByA11yRole("checkbox");
    expect(checkbox.props.accessibilityState).toEqual({
        disabled: undefined,
        checked: true,
    }); // checked, clickable checkbox
    expect(tree.toJSON()).toMatchSnapshot();

    const redElements = JSON.stringify(tree.toJSON()).match(/#B00020/g);
    expect(redElements).toBeNull(); // i.e. no components marked with error color
});

it("renders correctly on error", async () => {
    const { findByA11yRole, ...tree } = render(
        <LocalizedMockPaperProvider>
            <TermsAndConditions accepted={false} error handlePress={noop} />
        </LocalizedMockPaperProvider>
    );

    const checkbox = await findByA11yRole("checkbox");
    expect(checkbox.props.accessibilityState).toEqual({
        disabled: undefined,
        checked: false,
    }); // empty but clickable checkbox
    const treeJson = tree.toJSON();
    const redElements = JSON.stringify(treeJson).match(/#B00020/g);
    expect(redElements?.length).toBe(4);
    expect(treeJson).toMatchSnapshot();
});

it("renders correctly before pressing", async () => {
    const { findByA11yRole, ...tree } = render(
        <LocalizedMockPaperProvider>
            <TermsAndConditions
                accepted={false}
                error={false}
                handlePress={noop}
            />
        </LocalizedMockPaperProvider>
    );

    const checkbox = await findByA11yRole("checkbox");
    expect(checkbox.props.accessibilityState).toEqual({
        disabled: undefined,
        checked: false,
    }); // empty but clickable checkbox

    const redElements = JSON.stringify(tree.toJSON()).match(/#B00020/g);
    expect(redElements).toBeNull(); // i.e. no components marked with error color
    expect(tree.toJSON()).toMatchSnapshot();
});
