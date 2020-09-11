import { FontAwesome } from "@expo/vector-icons";
import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Dialog,
    Menu,
    Paragraph,
    Portal,
    TextInput,
    useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import { reportAsInappropriate } from "../../state/action-creators/reportAsInappropriate";
import { IState } from "../../state/state/IState";

interface Props {
    id: string;
    close: () => void;
    visible: boolean;
    reportAsInappropriate: typeof reportAsInappropriate;
}

const otherReason = "reportReasonOther";
const reasons = [
    "reportReasonSexual",
    "reportReasonHateful",
    "reportReasonInfringement",
    "reportReasonDrugs",
    "reportReasonPII",
    otherReason,
];

const styles = StyleSheet.create({
    downIcon: {
        position: "absolute",
        right: 0,
        bottom: 14,
        margin: 16,
    },
    reasonsInput: { marginVertical: 8 },
});

const minCommentLength = 7;

const ReportDialog: FC<Props> = ({
    id,
    visible,
    close,
    reportAsInappropriate,
}) => {
    const [reasonsOpen, showReasons] = useState(false);
    const [reason, setReason] = useState("");
    const [comment, setComment] = useState(""); // in case of 'other' reason

    const { t } = useTranslation();
    const { colors } = useTheme();

    const reset = () => {
        setReason("");
        setComment("");
        showReasons(false);
    };
    const handleClose = () => {
        reset();
        close();
    };
    const submitDisabled =
        !reason ||
        (reason === otherReason && comment.length < minCommentLength);
    const handleSubmit = () => {
        reportAsInappropriate(id, reason, comment);
        handleClose();
    };
    const hideReasons = () => showReasons(false);

    const renderReasonsInput = () => (
        <TextInput
            accessibilityStates={{}}
            label={t("reportReason")}
            onFocus={() => showReasons(true)}
            pointerEvents="none"
            mode="outlined"
            style={styles.reasonsInput}
            onChangeText={undefined}
            editable={false}
            value={t(reason)}
        />
    );

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={handleClose}>
                <Dialog.Title accessibilityStates={{}}>
                    {t("reportTitle")}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t("reportDescription")}</Paragraph>
                    <Menu
                        visible={reasonsOpen}
                        onDismiss={hideReasons}
                        anchor={
                            <TouchableOpacity onPress={() => showReasons(true)}>
                                <View pointerEvents="none">
                                    {renderReasonsInput()}
                                </View>
                                <FontAwesome
                                    name="chevron-down"
                                    size={14}
                                    style={{
                                        ...styles.downIcon,
                                        color: colors.disabled,
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    >
                        {reasons.map((reason, i) => (
                            <Fragment key={reason}>
                                <Menu.Item
                                    key={reason}
                                    onPress={() => {
                                        setReason(reason);
                                        hideReasons();
                                    }}
                                    title={t(reason)}
                                />
                            </Fragment>
                        ))}
                    </Menu>
                    {reason === otherReason && (
                        <TextInput
                            accessibilityStates={{}}
                            label={t("reportOtherComment")}
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                        />
                    )}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleClose} accessibilityStates={{}}>
                        {t("reportCancelButton")}
                    </Button>
                    <Button
                        onPress={handleSubmit}
                        accessibilityStates={{}}
                        disabled={submitDisabled}
                    >
                        {t(`reportConfirmButton`)}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps: Pick<Props, "reportAsInappropriate"> = {
    reportAsInappropriate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDialog);
