import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { connect } from "react-redux";
import LocalizationProvider from "../localization/LocalizationProvider";
import NavigationApp from "../navigation/NavigationApp";
import OnboardingScreen from "../screens/OnboardingScreen";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { darkTheme, lightTheme } from "./theme";

interface Props {
    isDarkModeOn: boolean;
    isFirstOpen: boolean;
}

const ThemedApp = ({ isDarkModeOn, isFirstOpen }: Props) => (
    <PaperProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
        <LocalizationProvider>
            {isFirstOpen ? <OnboardingScreen /> : <NavigationApp />}
        </LocalizationProvider>
    </PaperProvider>
);

const mapStateToProps: MapStateToProps<Props> = ({ app }) => ({
    isDarkModeOn: app.isDarkModeOn,
    isFirstOpen: app.isFirstOpen,
});
export default connect(mapStateToProps)(ThemedApp);
