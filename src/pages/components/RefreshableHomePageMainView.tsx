import React, { Component } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { requestFetchPosts } from "../../redux/action-creators/requestFetchPosts";
import { IPostContent } from "../../redux/IPost";
import { IReduxState } from "../../redux/IReduxState";
import { INavigationProps } from "../INavigationProps";
import { styles } from "../Styles";
import HomePageMainView from "./HomePageMainView";

interface Props extends INavigationProps {
    requestFetchPosts: (now: Date) => void;
    refreshing: boolean;
    post: IPostContent;
}

class RefreshableHomePageMainView extends Component<Props> {
    public componentDidMount() {
        this.props.requestFetchPosts(new Date());
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={localStyles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() =>
                                this.props.requestFetchPosts(new Date())
                            }
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

const mapDispatchToProps: Pick<Props, "requestFetchPosts"> = {
    requestFetchPosts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RefreshableHomePageMainView);
