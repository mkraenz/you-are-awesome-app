import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { connect } from "react-redux";
import LocalizationProvider from "../localization/LocalizationProvider";
import NavigationApp from "../navigation/NavigationApp";
import IOSOnboardingScreen from "../screens/IOSOnboardingScreen";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { darkTheme, lightTheme } from "./theme";

interface Props {
    isDarkModeOn: boolean;
    onboardingCompleted: boolean;
}

const ThemedApp = ({ isDarkModeOn, onboardingCompleted }: Props) => (
    <PaperProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
        <LocalizationProvider>
            {onboardingCompleted ? <NavigationApp /> : <IOSOnboardingScreen />}
        </LocalizationProvider>
    </PaperProvider>
);

const mapStateToProps: MapStateToProps<Props> = ({ app }) => ({
    isDarkModeOn: app.isDarkModeOn,
    onboardingCompleted: app.onboardingCompleted,
});
export default connect(mapStateToProps)(ThemedApp);
