import { noop } from "lodash";
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
                <MyAppbar title="my-title" onBugActionPress={noop} />
            </MockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
