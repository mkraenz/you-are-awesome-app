import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Dialog,
    Menu,
    Paragraph,
    TextInput,
    useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import { reportAsInappropriate } from "../../state/action-creators/reportAsInappropriate";
import { IState } from "../../state/state/IState";
import { MapStateToProps } from "../../state/state/MapStateToProps";
import ReportThankYouDialog from "./ReportThankYouDialog";

interface Props {
    id: string;
    close: () => void;
    visible: boolean;
    reportAsInappropriate: typeof reportAsInappropriate;
    noInternet: boolean;
}

const otherReason = "reportReasonOther";
const infringementReason = "reportReasonInfringement";
const reasons = [
    "reportReasonSexual",
    "reportReasonHateful",
    infringementReason,
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
    noInternetContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 8,
    },
    noInternetIcon: { marginRight: 8 },
});

const minCommentLength = 7;

const ReportDialog: FC<Props> = ({
    id,
    visible,
    close,
    reportAsInappropriate,
    noInternet,
}) => {
    const [reasonsOpen, showReasons] = useState(false);
    const [reason, setReason] = useState("");
    const [comment, setComment] = useState("");
    const [thankYouVisible, showThankYou] = useState(false);

    const commentVisible =
        reason === otherReason || reason === infringementReason;

    const { t } = useTranslation();
    const { colors } = useTheme();

    const reset = () => {
        setReason("");
        setComment("");
        showReasons(false);
        showThankYou(false);
    };
    const handleClose = () => {
        reset();
        close();
    };
    const submitDisabled =
        noInternet ||
        !reason ||
        (reason === otherReason && comment.length < minCommentLength) ||
        (reason === infringementReason && comment.length < minCommentLength);
    const handleSubmit = () => {
        reportAsInappropriate(id, reason, comment);
        reset();
        showThankYou(true);
    };
    const hideReasons = () => showReasons(false);

    const renderReasonsInput = () => (
        <TextInput
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

    if (thankYouVisible) {
        return <ReportThankYouDialog onDismiss={handleClose} />;
    }
    return (
        <Dialog visible={visible} onDismiss={handleClose}>
            <Dialog.Title>{t("reportTitle")}</Dialog.Title>
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
                {commentVisible && (
                    <TextInput
                        label={t("reportOtherComment")}
                        value={comment}
                        onChangeText={setComment}
                    />
                )}
                {noInternet && (
                    <View style={styles.noInternetContainer}>
                        <MaterialIcons
                            name="error-outline"
                            size={20}
                            style={{
                                ...styles.noInternetIcon,
                                color: colors.error,
                            }}
                        />
                        <Paragraph>{t("noInternet")}</Paragraph>
                    </View>
                )}
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleClose}>{t("reportCancelButton")}</Button>
                <Button onPress={handleSubmit} disabled={submitDisabled}>
                    {t(`reportConfirmButton`)}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "noInternet">> = (
    state: IState
) => ({
    noInternet: !state.network.connected,
});
const mapDispatchToProps: Pick<Props, "reportAsInappropriate"> = {
    reportAsInappropriate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDialog);
