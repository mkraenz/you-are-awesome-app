import { fireEvent, render } from "@testing-library/react-native";
import i18next from "i18next";
import { noop } from "lodash";
import React from "react";
import "react-native";
import renderer, { act } from "react-test-renderer";
import DeleteConfirmationDialog from "../../../src/components/favorites/DeleteConfirmationDialog";
import LocalizedMockPaperProvider from "../../helpers/LocalizedMockPaperProvider";

it("renders correctly", async () => {
    const tree = renderer
        .create(
            <LocalizedMockPaperProvider>
                <DeleteConfirmationDialog
                    onConfirm={noop}
                    onDismiss={noop}
                    visible={true}
                />
            </LocalizedMockPaperProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("calls confirm callback when confirm button clicked", async () => {
    const confirmMock = jest.fn();
    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <DeleteConfirmationDialog
                onConfirm={confirmMock}
                onDismiss={noop}
                visible={true}
            />
        </LocalizedMockPaperProvider>
    );
    const confirmButton = await findByText(i18next.t("favoritesDelete"));
    await act(async () => {});
    expect(confirmMock).not.toHaveBeenCalled();

    fireEvent.press(confirmButton);

    expect(confirmMock).toHaveBeenCalled();
});

it("calls dismiss callback when cancel button clicked", async () => {
    const dismissMock = jest.fn();
    const { findByText } = render(
        <LocalizedMockPaperProvider>
            <DeleteConfirmationDialog
                onConfirm={noop}
                onDismiss={dismissMock}
                visible={true}
            />
        </LocalizedMockPaperProvider>
    );
    const cancelButton = await findByText(i18next.t("favoritesCancel"));
    await act(async () => {});
    expect(dismissMock).not.toHaveBeenCalled();

    fireEvent.press(cancelButton);

    expect(dismissMock).toHaveBeenCalled();
});
