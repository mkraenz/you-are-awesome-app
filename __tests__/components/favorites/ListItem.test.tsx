import { render } from "@testing-library/react-native";
import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer, { act } from "react-test-renderer";
import ListItem from "../../../src/components/favorites/ListItem";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly in normal mode", async () => {
    const tree = renderer
        .create(
            <TestLocalizationProvider>
                <ListItem
                    author="Merlin"
                    country="The old Kingdom of Britania"
                    isodate="975-09-17"
                    onLongPress={noop}
                    onPressInSelectMode={noop}
                    selectMode={false}
                    selected={false}
                    text="The story of King Arthur"
                />
            </TestLocalizationProvider>
        )
        .toJSON();
    await act(async () => {});

    const treeStr = JSON.stringify(tree);
    expect(treeStr).toContain("Merlin");
    expect(treeStr).toContain("The old Kingdom of Britania");
    expect(treeStr).toContain("975-09-17");
    expect(treeStr).toContain("The story of King Arthur");
    expect(tree).toMatchSnapshot();
});

it("renders correctly in select mode with disabled radio button", async () => {
    const { findByA11yRole, ...tree } = render(
        <TestLocalizationProvider>
            <ListItem
                author="Merlin"
                country="The old Kingdom of Britania"
                isodate="975-09-17"
                onLongPress={noop}
                onPressInSelectMode={noop}
                selectMode={true}
                selected={false}
                text="The story of King Arthur"
            />
        </TestLocalizationProvider>
    );
    const selectedButton = await findByA11yRole("radio");
    await act(async () => {});

    expect(selectedButton).toBeTruthy();
    // wow, this is incredibly ugly
    const radioButtonFill = (selectedButton.children[0] as any).children[0]
        .children[0].children[0].children[0];
    expect(radioButtonFill).toBe(undefined); // i.e. radio button is off
    expect(tree.toJSON()).toMatchSnapshot();
});

it("renders correctly in select mode with enabled radio button", async () => {
    const { findByA11yRole, debug, ...tree } = render(
        <TestLocalizationProvider>
            <ListItem
                author="Merlin"
                country="The old Kingdom of Britania"
                isodate="975-09-17"
                onLongPress={noop}
                onPressInSelectMode={noop}
                selectMode={true}
                selected={true}
                text="The story of King Arthur"
            />
        </TestLocalizationProvider>
    );
    const selectedButton = await findByA11yRole("radio");

    expect(selectedButton).toBeTruthy();
    // wow, this is incredibly ugly
    const radioButtonFill = (selectedButton.children[0] as any).children[0]
        .children[0].children[0].children[0];
    expect(radioButtonFill).toBeTruthy(); // i.e. radio button is on
    expect(tree.toJSON()).toMatchSnapshot();
});
