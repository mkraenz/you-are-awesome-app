import { act, fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import BugReportDialog from "../../../src/components/common/BugReportDialog";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

jest.mock("expo-firebase-analytics", () => ({ logEvent: jest.fn() }));

beforeEach(() => {});

it("renders correctly", () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <BugReportDialog
                    handleClose={noop}
                    handleConfirm={noop}
                    visible={true}
                />
            </LocalizedMockPaperProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("calls analytics and linking when confirm button clicked", async () => {
    const confirmMock = jest.fn();

    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <BugReportDialog
                handleClose={noop}
                handleConfirm={confirmMock}
                visible={true}
            />
        </LocalizedMockPaperProvider>
    );
    const confirmButton = await findByText(i18next.t("bugReportConfirmButton"));
    await act(async () => {});

    fireEvent.press(confirmButton);

    expect(confirmMock).toHaveBeenCalled();
});

it("calls dismiss callback when cancel button clicked", async () => {
    const dismissMock = jest.fn();
    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <BugReportDialog
                handleClose={dismissMock}
                handleConfirm={noop}
                visible={true}
            />
        </LocalizedMockPaperProvider>
    );
    const cancelButton = await findByText(i18next.t("bugReportCancelButton"));
    await act(async () => {});
    expect(dismissMock).not.toHaveBeenCalled();

    fireEvent.press(cancelButton);

    expect(dismissMock).toHaveBeenCalled();
});
