import React, { FC } from "react";
import { DefaultTheme, Provider } from "react-native-paper";

const MockPaperProvider: FC = ({ children }) => {
    return <Provider theme={DefaultTheme}>{children}</Provider>;
};

export default MockPaperProvider;
