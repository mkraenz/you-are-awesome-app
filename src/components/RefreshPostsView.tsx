import React, { Component, ReactNode } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { requestFetchPosts } from "../state/action-creators/requestFetchPosts";
import { MapStateToProps } from "../state/state/MapStateToProps";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    scrollView: {
        flex: 1,
    },
});

interface Props {
    requestFetchPosts: (now: Date) => void;
    refreshing: boolean;
    children: ReactNode;
}

class RefreshPostsView extends Component<Props> {
    public componentDidMount() {
        this.props.requestFetchPosts(new Date());
    }

    public render() {
        const { refreshing, children, requestFetchPosts } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => requestFetchPosts(new Date())}
                        />
                    }
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps: MapStateToProps<Pick<Props, "refreshing">> = (
    state
) => ({
    refreshing: state.posts.refreshing,
});

const mapDispatchToProps: Pick<Props, "requestFetchPosts"> = {
    requestFetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshPostsView);
