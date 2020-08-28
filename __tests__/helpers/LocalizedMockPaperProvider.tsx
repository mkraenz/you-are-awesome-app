import React, { FC } from "react";
import MockPaperProvider from "./MockPaperProvider";
import TestLocalizationProvider from "./TestLocalizationProvider";

const LocalizedMockPaperProvider: FC<{ dark?: boolean }> = ({
    children,
    dark = false,
}) => {
    return (
        <MockPaperProvider dark={dark}>
            <TestLocalizationProvider>{children}</TestLocalizationProvider>
        </MockPaperProvider>
    );
};

export default LocalizedMockPaperProvider;
