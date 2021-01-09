import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    route?: "favorites" | "myContributions";
}

const DeleteConfirmationDialog: FC<Props> = ({
    visible,
    onDismiss,
    onConfirm,
    route = "favorites",
}) => {
    const { t } = useTranslation();
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>{t(`${route}DeleteDialogTitle`)}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t(`${route}DeleteDialogText`)}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>{t(`${route}Cancel`)}</Button>
                    <Button onPress={onConfirm}>{t(`${route}Delete`)}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default DeleteConfirmationDialog;
