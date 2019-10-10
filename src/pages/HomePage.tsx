import random from "lodash/random";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAddPost } from "../redux/Actions";
import { IPost, IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    currentPost: IPostContent;
    dispatchAddPost: (payload: IPost) => void;
    fetchPostsFrom: string;
}

class HomePage extends Component<Props> {
    public componentDidMount() {
        // casual lib probably gets loaded async
        this.fetchData();
    }

    public async fetchData() {
        const response = await fetch(this.props.fetchPostsFrom);
        const posts: IPost[] = await response.json();
        this.props.dispatchAddPost(posts[random(posts.length - 1)]);
    }

    public render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={
                        <HeaderTitle style={styles.header}>Home</HeaderTitle>
                    }
                ></Header>
                <View style={styles.textContainer}>
                    <View style={[localStyles.balloon]}>
                        <Text
                            style={{
                                paddingTop: 5,
                                color: "white",
                                fontSize: 32,
                            }}
                        >
                            {this.props.currentPost.text}
                        </Text>

                        <Text
                            style={{
                                paddingTop: 5,
                                color: "white",
                                alignContent: "flex-end",
                            }}
                        >
                            {this.props.currentPost.author} from{" "}
                            {this.props.currentPost.country}
                        </Text>
                    </View>
                </View>

                <Button
                    title="Share awesomeness"
                    onPress={() =>
                        this.props.navigation.navigate("AddAwesomeTextModal")
                    }
                />
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    authorText: {
        fontSize: 24,
    },
    balloon: {
        marginTop: 5,
        padding: 15,
        borderRadius: 20,
        backgroundColor: "#1084ff",
    },
});

const mapStateToProps = (
    state: IReduxState
): Pick<IReduxState, "currentPost" | "fetchPostsFrom"> => ({
    currentPost: state.currentPost,
    fetchPostsFrom: state.fetchPostsFrom,
});

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    dispatchAddPost: (payload: IPost): IAddPost =>
        dispatch({ type: ReduxAction.AddPost, payload }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(HomePage);
