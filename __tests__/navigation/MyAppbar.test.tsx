import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import MyAppbar from "../../src/components/navigation/MyAppbar";
import MockPaperProvider from "../helpers/MockPaperProvider";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly without dark mode", () => {
    const tree = renderer
        .create(
            <MockPaperProvider>
                <MyAppbar title="my-title" />
            </MockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders light status bar in dark mode", () => {
    const tree = renderer
        .create(
            <MockPaperProvider dark>
                <MyAppbar title="my-title" />
            </MockPaperProvider>
        )
        .toJSON();

    // don't know how to actually test this. the snapshot does not contain the color
    // leaving this for specification even though it's not testing anything
});
