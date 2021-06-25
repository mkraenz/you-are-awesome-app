import { cleanup } from "@testing-library/react-native";
import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Layout from "../../../src/components/common/Layout";
import { Route } from "../../../src/navigation/Route";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

// Portal seems to be using async things that made ONLY the pipeline fail
// https://github.com/facebook/jest/issues/6434#issuecomment-583904021
afterEach(cleanup);

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
