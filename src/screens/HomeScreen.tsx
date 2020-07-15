import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import RefreshPostsView from "../components/RefreshPostsView";
import { Route } from "../navigation/Route";
import { IPostContent } from "../state/state/IPost";
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
    post: IPostContent;
}

const HomeScreen: FC<Props> = ({ post }) => {
    const theme = useTheme() as FullTheme;
    const cardStyle = theme.dark
        ? {
              backgroundColor: theme.colors.accentedCard,
          }
        : { backgroundColor: theme.colors.primary };
    const { author, text, country } = post;
    return (
        <Layout route={Route.Home}>
            <RefreshPostsView>
                <View style={styles.container}>
                    <Card style={cardStyle}>
                        <Card.Content>
                            <Title style={{ color: "white" }}>{text}</Title>
                            <Paragraph style={{ color: "white" }}>
                                {author} from {country}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </RefreshPostsView>
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Props> = (state) => ({
    post: state.posts.currentPost,
});

export default connect(mapStateToProps)(HomeScreen);
