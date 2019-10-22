import React, { Component } from "react";
import { AppState, AppStateStatus } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import NavigationAppContainer from "./NavigationAppContainer";
import { IPostsFetchRequested } from "./redux/Actions";
import { IReduxState } from "./redux/IReduxState";
import { ReduxAction } from "./redux/ReduxAction";
import { isToday } from "./utils/toTodayString";

interface Props {
    lastUpdate: Date;
    requestFetchPosts: (now: Date) => void;
}

class AppStateChangedContainer extends Component<Props> {
    public componentDidMount() {
        AppState.addEventListener("change", state =>
            this.handleAppStateChange(state)
        );
    }

    public componentWillUnmount() {
        AppState.removeEventListener("change", state =>
            this.handleAppStateChange(state)
        );
    }

    private handleAppStateChange(nextAppState: AppStateStatus) {
        if (nextAppState === "active" && !isToday(this.props.lastUpdate)) {
            this.props.requestFetchPosts(new Date());
        }
    }

    public render() {
        return <NavigationAppContainer />;
    }
}

const mapStateToProps = (state: IReduxState): Pick<Props, "lastUpdate"> => ({
    lastUpdate: state.app.lastUpdate,
});

const mapDispatcherToProps = (
    dispatch: Dispatch
): Pick<Props, "requestFetchPosts"> => ({
    requestFetchPosts: (now: Date): IPostsFetchRequested =>
        dispatch({ type: ReduxAction.PostsFetchRequested, payload: { now } }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(AppStateChangedContainer);
