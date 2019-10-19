import { random } from "lodash";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IPostFetched } from "../redux/Actions";
import { IPost, IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import { INavigationProps } from "./INavigationProps";
import { maybeGetTodaysPost } from "./maybeGetTodaysPost";
import { styles } from "./Styles";

export type PostWithDate = IPost & { isodate: string };

interface Props extends INavigationProps {
    currentPost: IPostContent;
    fetchPost: (payload: IPost) => void;
    SERVER_URI: string;
}

class HomePage extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.fetchData();
    }

    public async fetchData() {
        const response = await fetch(this.props.SERVER_URI);
        // NOTE: capital letters in the google sheets header (= names of the json's properties)
        // will be converted to all small letters
        const posts: PostWithDate[] = (await response.json()).rows;
        const todaysPost = maybeGetTodaysPost(new Date(), posts);
        if (todaysPost) {
            this.props.fetchPost(todaysPost);
        } else {
            this.props.fetchPost(posts[random(posts.length - 1)]);
        }
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
                    onPress={() => this.props.navigation.navigate("Contribute")}
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

const mapStateToProps = (state: IReduxState) => ({
    currentPost: state.app.currentPost,
    SERVER_URI: state.app.SERVER_URI,
});

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    fetchPost: (payload: IPost): IPostFetched =>
        dispatch({ type: ReduxAction.PostFetched, payload }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(HomePage);
