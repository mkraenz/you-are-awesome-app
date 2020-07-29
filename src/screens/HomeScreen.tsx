import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
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
});

interface Props {
    msg: IMessageContent;
}

const HomeScreen: FC<Props> = ({ msg }) => {
    const theme = useTheme() as FullTheme;
    const cardStyle = theme.dark
        ? {
              backgroundColor: theme.colors.accentedCard,
          }
        : { backgroundColor: theme.colors.primary };
    const { author, text, country } = msg;
    return (
        <Layout route={Route.Home}>
            <RefreshMessagesView>
                <View style={styles.container}>
                    <Card style={cardStyle} accessibilityStates={{}}>
                        <Card.Content>
                            <Title style={{ color: "white" }}>{text}</Title>
                            <Paragraph style={{ color: "white" }}>
                                {author} from {country}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </RefreshMessagesView>
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Props> = (state) => ({
    msg: state.messages.currentMessage,
});

export default connect(mapStateToProps)(HomeScreen);
