import React from "react";
import { Button, Dialog, Paragraph } from "react-native-paper";
import { useTranslation } from "../../utils/useTranslation";

interface Props {
    visible: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const BugReportDialog = ({ visible, handleClose, handleConfirm }: Props) => {
    const { t } = useTranslation();

    return (
        <Dialog visible={visible} onDismiss={handleClose}>
            <Dialog.Title>{t("bugReport:title")}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{t("bugReport:description")}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleClose}>{t("bugReport:cancel")}</Button>
                <Button onPress={handleConfirm}>
                    {t(`bugReport:confirm`)}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default BugReportDialog;
