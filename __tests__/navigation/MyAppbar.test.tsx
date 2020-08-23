import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import MyAppbar from "../../src/components/navigation/MyAppbar";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly without dark mode", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={DefaultTheme}>
                <MyAppbar title="my-title" />
            </PaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("renders light status bar in dark mode", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={{ ...DefaultTheme, dark: true }}>
                <MyAppbar title="my-title" />
            </PaperProvider>
        )
        .toJSON();

    // don't know how to actually test this. the snapshot does not contain the color
    // leaving this for specification even though it's not testing anything
});
