import React from "react";
import "react-native";
import ShallowRenderer from "react-test-renderer/shallow";
import MyAppbar from "../../src/components/navigation/MyAppbar";

jest.mock("@expo/vector-icons", () => ({ FontAwesome: "Fontawesome" }));

it("renders correctly", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<MyAppbar title="my-title" />);
    const tree = renderer.getRenderOutput();

    expect(tree).toMatchSnapshot();
});
