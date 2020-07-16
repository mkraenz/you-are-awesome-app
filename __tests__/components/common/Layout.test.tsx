import React from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Layout from "../../../src/components/common/Layout";
import { Route } from "../../../src/navigation/Route";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <PaperProvider theme={DefaultTheme}>
                <TestLocalizationProvider>
                    <Layout route={Route.Home} />
                </TestLocalizationProvider>
            </PaperProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
