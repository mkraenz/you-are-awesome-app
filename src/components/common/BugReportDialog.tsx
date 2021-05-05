import React from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { Button, Dialog, Paragraph } from "react-native-paper";
import { Analytics } from "../../api/Analytics";
import { CONFIG } from "../../config";

interface Props {
    visible: boolean;
    handleClose: () => void;
}

const BugReportDialog = ({ visible, handleClose }: Props) => {
    const { t } = useTranslation();

    const handleConfirm = () => {
        Analytics.logLinkFollow("feedbackForm");
        Linking.openURL(CONFIG.uri.feedbackForm);
    };
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
                <Button onPress={handleConfirm}>
                    {t(`bugReportConfirmButton`)}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default BugReportDialog;
