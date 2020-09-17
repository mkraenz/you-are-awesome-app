import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface Props {
    onDismiss: () => void;
}

const ReportThankYouDialog: FC<Props> = ({ onDismiss }) => {
    const { t } = useTranslation();
    return (
        <Portal>
            <Dialog visible={true} onDismiss={onDismiss}>
                <Dialog.Title accessibilityStates={{}}>
                    {t("reportThankYouTitle")}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t("reportThankYouText")}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss} accessibilityStates={{}}>
                        {t(`reportThankYouButton`)}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
export default ReportThankYouDialog;
