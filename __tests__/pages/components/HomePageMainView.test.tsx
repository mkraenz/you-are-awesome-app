import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import HomePageMainView from "../../../src/pages/components/HomePageMainView";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <HomePageMainView
                post={{
                    author: "my-author",
                    text: "my-text",
                    country: "my-country",
                }}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
