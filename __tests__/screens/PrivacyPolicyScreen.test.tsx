import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import PrivacyPolicyScreen from "../../src/screens/PrivacyPolicyScreen";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

jest.mock("react-native-webview", () => ({ WebView: "WebView" }));

const ConfiguredPrivacyPolicyScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <PrivacyPolicyScreen />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders a button and the webview", async () => {
    const tree = renderer.create(<ConfiguredPrivacyPolicyScreen />).toJSON();

    expect(tree).toMatchSnapshot();
});
