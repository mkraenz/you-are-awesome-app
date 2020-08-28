import React from "react";
import "react-native";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Layout from "../../../src/components/common/Layout";
import { Route } from "../../../src/navigation/Route";
import MockPaperProvider from "../../helpers/MockPaperProvider";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <MockPaperProvider>
                <TestLocalizationProvider>
                    <Layout route={Route.Home} />
                </TestLocalizationProvider>
            </MockPaperProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
