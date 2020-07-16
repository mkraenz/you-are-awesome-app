import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { connect } from "react-redux";
import LocalizationProvider from "../localization/LocalizationProvider";
import NavigationApp from "../navigation/NavigationApp";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { darkTheme, lightTheme } from "./theme";

interface Props {
    isDarkModeOn: boolean;
}

const ThemedApp = (props: Props) => (
    <PaperProvider theme={props.isDarkModeOn ? darkTheme : lightTheme}>
        <LocalizationProvider>
            <NavigationApp />
        </LocalizationProvider>
    </PaperProvider>
);

const mapStateToProps: MapStateToProps<Props> = (state) => ({
    isDarkModeOn: state.app.isDarkModeOn,
});
export default connect(mapStateToProps)(ThemedApp);
