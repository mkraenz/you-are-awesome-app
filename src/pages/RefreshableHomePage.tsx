import React, { Component } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IPostFetchRequested } from "../redux/Actions";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import HomePage from "./HomePage";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    requestFetchPosts: () => void;
}

interface State {
    refreshing: boolean;
}

class RefreshableHomePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props.requestFetchPosts();
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
                    <HomePage navigation={this.props.navigation} />
                </ScrollView>
            </SafeAreaView>
        );
    }

    private async handleRefresh() {
        this.setState({
            refreshing: true,
        });
        this.props.requestFetchPosts();
        this.setState({ refreshing: false });
    }
}
const mapStateToProps = (state: IReduxState) => state;

const mapDispatcherToProps = (
    dispatch: Dispatch
): Pick<Props, "requestFetchPosts"> => ({
    requestFetchPosts: (): IPostFetchRequested =>
        dispatch({ type: ReduxAction.PostsFetchRequested }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(RefreshableHomePage);

/** global styles, use as defualts */
export const localStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
});
