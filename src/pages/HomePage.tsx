import React, { Component } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchPosts } from "../api/fetchPosts";
import { IPostFetched } from "../redux/Actions";
import { IPost, IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import Balloon from "./components/Balloon";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    currentPost: IPostContent;
    fetchPost: (payload: IPost) => void;
    SERVER_URI: string;
}

interface State {
    refreshing: boolean;
}

class HomePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        fetchPosts(this.props.SERVER_URI, this.props.fetchPost);
        this.state = {
            refreshing: false,
        };
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={localStyles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.handleRefresh()}
                        />
                    }
                >
                    <View style={styles.container}>
                        <Header
                            centerComponent={
                                <HeaderTitle style={styles.header}>
                                    Home
                                </HeaderTitle>
                            }
                        ></Header>
                        <View style={localStyles.textContainer}>
                            <Balloon post={this.props.currentPost} />
                        </View>

                        <Button
                            title="Share awesomeness"
                            onPress={() =>
                                this.props.navigation.navigate("Contribute")
                            }
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    private async handleRefresh() {
        this.setState({
            refreshing: true,
        });
        await fetchPosts(this.props.SERVER_URI, this.props.fetchPost);
        this.setState({ refreshing: false });
    }
}
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

/** global styles, use as defualts */
export const localStyles = StyleSheet.create({
    textContainer: {
        justifyContent: "center",
        padding: 20,
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
});

function wait(timeout: number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
