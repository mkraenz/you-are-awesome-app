import { act, fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import { noop } from "lodash";
import React from "react";
import "react-native";
import { Linking } from "react-native";
import renderer from "react-test-renderer";
import BugReportDialog from "../../../src/components/common/BugReportDialog";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

jest.mock("expo-firebase-analytics", () => ({ logEvent: jest.fn() }));

beforeEach(() => {});

it("renders correctly", () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <BugReportDialog handleClose={noop} visible={true} />
            </LocalizedMockPaperProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("calls analytics and linking when confirm button clicked", async () => {
    const linkingMock = jest
        .spyOn(Linking, "openURL")
        .mockResolvedValueOnce(undefined);

    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <BugReportDialog handleClose={noop} visible={true} />
        </LocalizedMockPaperProvider>
    );
    const confirmButton = await findByText(i18next.t("bugReportConfirmButton"));
    await act(async () => {});
    expect(linkingMock).not.toHaveBeenCalled();

    fireEvent.press(confirmButton);

    const urlWithBuildVersion = new RegExp(
        /https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSdheSDuk56z1NaNVjDIaDLpiO4GZj2ZXcoHlQxIIpRREFioTA\/viewform\?usp=pp_url&entry\.809955830=\d+/
    );
    expect(linkingMock).toHaveBeenCalledWith(
        expect.stringMatching(urlWithBuildVersion)
    );

    linkingMock.mockReset();
    linkingMock.mockRestore();
});

it("calls dismiss callback when cancel button clicked", async () => {
    const dismissMock = jest.fn();
    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <BugReportDialog handleClose={dismissMock} visible={true} />
        </LocalizedMockPaperProvider>
    );
    const cancelButton = await findByText(i18next.t("bugReportCancelButton"));
    await act(async () => {});
    expect(dismissMock).not.toHaveBeenCalled();

    fireEvent.press(cancelButton);

    expect(dismissMock).toHaveBeenCalled();
});
