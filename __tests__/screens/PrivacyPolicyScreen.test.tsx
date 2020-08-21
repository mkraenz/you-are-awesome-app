import React, { FC } from "react";
import "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import PrivacyPolicyScreen from "../../src/screens/PrivacyPolicyScreen";
import MockedNavigator from "../helpers/MockedNavigation";
import TestLocalizationProvider from "../helpers/TestLocalizationProvider";

jest.mock("react-native-webview", () => ({ WebView: "WebView" }));
// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const ConfiguredPrivacyPolicyScreen: FC = () => (
    <PaperProvider theme={DefaultTheme}>
        <TestLocalizationProvider>
            <MockedNavigator component={PrivacyPolicyScreen} />
        </TestLocalizationProvider>
    </PaperProvider>
);

it("renders a button and the webview", async () => {
    const tree = renderer.create(<ConfiguredPrivacyPolicyScreen />).toJSON();

    expect(tree).toMatchSnapshot();
});
