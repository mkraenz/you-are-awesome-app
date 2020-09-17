import i18next from "i18next";
import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer, { act } from "react-test-renderer";
import ReportThankYouDialog from "../../../src/components/home/ReportThankYouDialog";
import TestLocalizationProvider from "../../helpers/TestLocalizationProvider";

it("renders correctly", async () => {
    const tree = renderer
        .create(
            <TestLocalizationProvider>
                <ReportThankYouDialog onDismiss={noop} />
            </TestLocalizationProvider>
        )
        .toJSON();
    await act(async () => {});

    const treeStr = JSON.stringify(tree);
    expect(treeStr).toContain(i18next.t("reportThankYouTitle"));
    expect(treeStr).toContain(i18next.t("reportThankYouText"));
    expect(treeStr).toContain(i18next.t("reportThankYouButton"));
    expect(tree).toMatchSnapshot();
});
