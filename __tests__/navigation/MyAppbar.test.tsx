import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import MyAppbar from "../../src/components/navigation/MyAppbar";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={DefaultTheme}>
                <TestLocalizationProvider>
                    <MyAppbar title="my-title" />
                </TestLocalizationProvider>
            </PaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
