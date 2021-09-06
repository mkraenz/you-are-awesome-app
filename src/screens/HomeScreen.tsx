import Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    LongPressGestureHandler,
    LongPressGestureHandlerStateChangeEvent,
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import {
    Card,
    Paragraph,
    Portal,
    Snackbar,
    Title,
    useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import AnimatedLikeIcon from "../components/home/AnimatedLikeIcon";
import RefreshMessagesView from "../components/home/RefreshMessagesView";
import ReportDialog from "../components/home/ReportDialog";
import { Route } from "../navigation/Route";
import { addFavorite } from "../state/action-creators/addFavorite";
import { IMessage } from "../state/state/IMessage";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { FullTheme } from "../themes/theme";
import { useTranslation } from "../utils/useTranslation";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
    },
    bubble: {
        position: "relative",
        justifyContent: "center",
    },
    heartIcon: {
        position: "absolute",
        alignSelf: "center",
    },
});

const getCardStyle = (theme: FullTheme) => {
    return theme.dark
        ? { backgroundColor: theme.colors.accentedCard }
        : { backgroundColor: theme.colors.primary };
};

interface Props {
    msg: IMessage;
    addFavorite: typeof addFavorite;
}

const HomeScreen: FC<Props> = ({ msg, addFavorite }) => {
    const [heartShown, showHeart] = useState(false);
    const [snackbarShown, showSnackbar] = useState(false);
    const [reportDialogOpen, showReportDialog] = useState(false);
    const theme = useTheme() as FullTheme;
    const { t } = useTranslation();
    const cardStyle = getCardStyle(theme);
    const { author, text, country, id } = msg;

    const likeOnDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            addFavorite(msg);
            showHeart(true);
        }
    };
    const contributor = `${author}${t("from")}${country}`;
    const handleReportPressed = () => showReportDialog(!reportDialogOpen);
    const toggleSnackbar = () => showSnackbar(!snackbarShown);
    const copyToClipboardOnLongPress = ({
        nativeEvent,
    }: LongPressGestureHandlerStateChangeEvent) => {
        if (nativeEvent.state === State.ACTIVE) {
            const copiedText = `${text} - ${contributor} - ${t(
                "home:copyAppendix"
            )}`;
            Clipboard.setString(copiedText);
            toggleSnackbar();
        }
    };
    return (
        <Layout
            route={Route.Home}
            appbarProps={{
                actionIcon: "flag",
                onActionPress: handleReportPressed,
            }}
        >
            <RefreshMessagesView>
                <TapGestureHandler
                    onHandlerStateChange={likeOnDoubleTap}
                    numberOfTaps={2}
                >
                    <LongPressGestureHandler
                        onHandlerStateChange={copyToClipboardOnLongPress}
                        minDurationMs={600}
                    >
                        <View style={styles.container}>
                            <Card style={cardStyle}>
                                <Card.Content style={styles.bubble}>
                                    <Title style={{ color: "white" }}>
                                        {text}
                                    </Title>
                                    <Paragraph style={{ color: "white" }}>
                                        {contributor}
                                    </Paragraph>

                                    {heartShown && (
                                        <AnimatedLikeIcon
                                            style={styles.heartIcon}
                                            onFinished={() => showHeart(false)}
                                            maxIconSize={200}
                                        />
                                    )}
                                </Card.Content>
                            </Card>
                        </View>
                    </LongPressGestureHandler>
                </TapGestureHandler>
                <Snackbar
                    visible={snackbarShown}
                    onDismiss={toggleSnackbar}
                    duration={4000}
                >
                    {t("home:copiedInfo")}
                </Snackbar>
            </RefreshMessagesView>

            <Portal>
                {/* push Portal to top-level to test Dialogs individually. */}
                <ReportDialog
                    visible={reportDialogOpen}
                    close={() => showReportDialog(false)}
                    id={id}
                ></ReportDialog>
            </Portal>
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "msg">> = (state) => ({
    msg: state.messages.currentMessage,
});
const mapDispatchToProps = {
    addFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
