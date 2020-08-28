import React, { FC } from "react";
import { DefaultTheme, Provider } from "react-native-paper";

const MockPaperProvider: FC<{ dark?: boolean }> = ({
    children,
    dark = false,
}) => {
    return <Provider theme={{ ...DefaultTheme, dark }}>{children}</Provider>;
};

export default MockPaperProvider;
