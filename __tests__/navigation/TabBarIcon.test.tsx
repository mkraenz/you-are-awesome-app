import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import TabBarIcon from "../../src/components/navigation/TabBarIcon";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={DefaultTheme}>
                <TabBarIcon name="my-name" focused={false} />
            </PaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders correctly with focus", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={DefaultTheme}>
                <TabBarIcon name="my-name" focused />
            </PaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
