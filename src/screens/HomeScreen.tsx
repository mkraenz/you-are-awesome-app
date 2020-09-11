import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { Card, Paragraph, Title, useTheme } from "react-native-paper";
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

interface Props {
    msg: IMessage;
    addFavorite: typeof addFavorite;
}

const HomeScreen: FC<Props> = ({ msg, addFavorite }) => {
    const [heartShown, showHeart] = useState(false);
    const [reportDialogOpen, showReportDialog] = useState(false);
    const theme = useTheme() as FullTheme;
    const { t } = useTranslation();
    const cardStyle = theme.dark
        ? {
              backgroundColor: theme.colors.accentedCard,
          }
        : { backgroundColor: theme.colors.primary };
    const { author, text, country, id } = msg;

    const likeOnDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            addFavorite(msg);
            showHeart(true);
        }
    };
    const handleReportPressed = () => showReportDialog(!reportDialogOpen);
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
                    <View style={styles.container}>
                        <Card style={cardStyle} accessibilityStates={{}}>
                            <Card.Content style={styles.bubble}>
                                <Title style={{ color: "white" }}>{text}</Title>
                                <Paragraph style={{ color: "white" }}>
                                    {author}
                                    {t("from")}
                                    {country}
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
                </TapGestureHandler>
            </RefreshMessagesView>
            <ReportDialog
                visible={reportDialogOpen}
                close={() => showReportDialog(false)}
                id={id}
            ></ReportDialog>
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
