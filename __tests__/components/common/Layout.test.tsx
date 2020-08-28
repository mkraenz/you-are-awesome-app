import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Layout from "../../../src/components/common/Layout";
import { Route } from "../../../src/navigation/Route";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <Layout route={Route.Home} />
            </LocalizedMockPaperProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
