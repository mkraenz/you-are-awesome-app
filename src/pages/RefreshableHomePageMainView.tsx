import React, { Component } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IPostsFetchRequested } from "../redux/Actions";
import { IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import HomePageMainView from "./components/HomePageMainView";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    requestFetchPosts: () => void;
    refreshing: boolean;
    post: IPostContent;
}

class RefreshableHomePageMainView extends Component<Props> {
    public componentDidMount() {
        this.props.requestFetchPosts();
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={localStyles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() => this.props.requestFetchPosts()}
                        />
                    }
                >
                    <HomePageMainView post={this.props.post} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
});

const mapStateToProps = (
    state: IReduxState
): Pick<Props, "post" | "refreshing"> => ({
    post: state.app.currentPost,
    refreshing: state.app.refreshing,
});

const mapDispatcherToProps = (
    dispatch: Dispatch
): Pick<Props, "requestFetchPosts"> => ({
    requestFetchPosts: (): IPostsFetchRequested =>
        dispatch({ type: ReduxAction.PostsFetchRequested }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(RefreshableHomePageMainView);
