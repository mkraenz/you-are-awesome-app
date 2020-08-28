import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationDialog: FC<Props> = ({
    visible,
    onDismiss,
    onConfirm,
}) => {
    const { t } = useTranslation();
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title accessibilityStates={{}}>
                    {t("favoritesDeleteDialogTitle")}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t("favoritesDeleteDialogText")}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss} accessibilityStates={{}}>
                        {t("favoritesCancel")}
                    </Button>
                    <Button onPress={onConfirm} accessibilityStates={{}}>
                        {t("favoritesDelete")}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default DeleteConfirmationDialog;
