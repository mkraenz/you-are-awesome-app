import React, { FC, useState } from "react";
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
import RefreshMessagesView from "../components/RefreshMessagesView";
import { Route } from "../navigation/Route";
import { IMessageContent } from "../state/state/IMessage";
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
    msg: IMessageContent;
}

const HomeScreen: FC<Props> = ({ msg }) => {
    const [heartShown, showHeart] = useState(false);
    const theme = useTheme() as FullTheme;
    const cardStyle = theme.dark
        ? {
              backgroundColor: theme.colors.accentedCard,
          }
        : { backgroundColor: theme.colors.primary };
    const { author, text, country } = msg;

    const likeOnDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            showHeart(true);
        }
    };
    return (
        <Layout route={Route.Home}>
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
                                    {author} from {country}
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
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Props> = (state) => ({
    msg: state.messages.currentMessage,
});

export default connect(mapStateToProps)(HomeScreen);
