import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import TabBarIcon from "../../src/components/navigation/TabBarIcon";
import MockPaperProvider from "../helpers/MockPaperProvider";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly", () => {
    const tree = renderer
        .create(
            <MockPaperProvider>
                <TabBarIcon name="my-name" focused={false} />
            </MockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders correctly with focus", () => {
    const tree = renderer
        .create(
            <MockPaperProvider>
                <TabBarIcon name="my-name" focused />
            </MockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
