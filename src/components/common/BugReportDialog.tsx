import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Paragraph } from "react-native-paper";
import { openFeedbackForm } from "../../api/openFeedbackForm";

interface Props {
    visible: boolean;
    handleClose: () => void;
}

const BugReportDialog = ({ visible, handleClose }: Props) => {
    const { t } = useTranslation();

    return (
        <Dialog visible={visible} onDismiss={handleClose}>
            <Dialog.Title>{t("bugReportTitle")}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{t("bugReportDescription")}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleClose}>
                    {t("bugReportCancelButton")}
                </Button>
                <Button onPress={openFeedbackForm}>
                    {t(`bugReportConfirmButton`)}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default BugReportDialog;
