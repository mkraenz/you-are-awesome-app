import React, { FC, ReactNode } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { connect } from "react-redux";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { darkTheme, lightTheme } from "./theme";

interface Props {
    isDarkModeOn: boolean;
    children: ReactNode;
}

const ThemedApp: FC<Props> = ({ isDarkModeOn, children }) => (
    <PaperProvider theme={isDarkModeOn ? darkTheme : lightTheme}>
        {children}
    </PaperProvider>
);

const mapStateToProps: MapStateToProps<Pick<Props, "isDarkModeOn">> = ({
    app,
}) => ({
    isDarkModeOn: app.isDarkModeOn,
});
export default connect(mapStateToProps)(ThemedApp);
