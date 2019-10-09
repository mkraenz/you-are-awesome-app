import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { INavigationProps } from "./INavigationProps";
import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    currentPost: IPost;
    randomizeAwesomeText: () => void;
    dispatchAddPost: (payload: IPost) => void;
}

class HomePage extends Component<Props> {
    public componentDidMount() {
        // casual lib probably gets loaded async
        this.fetchData();
    }

    public async fetchData() {
        const response = await fetch(
            "https://my-json-server.typicode.com/proSingularity/you-are-awesome-app/posts"
        );
        const post: IPost[] = await response.json();
        this.props.dispatchAddPost(post[0]);
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

const mapStateToProps = (state: { currentPost: IPost }) => ({
    currentPost: state.currentPost,
});

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    dispatchAddPost: (payload: IPost) =>
        dispatch({ type: ReduxAction.AddPost, payload }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(HomePage);
