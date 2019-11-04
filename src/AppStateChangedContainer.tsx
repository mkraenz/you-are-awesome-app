import React, { Component } from "react";
import { AppState, AppStateStatus } from "react-native";
import { connect } from "react-redux";
import NetInfoChangedContainer from "./NetInfoChangedContainer";
import { requestFetchPosts } from "./redux/action-creators/requestFetchPosts";
import { IReduxState } from "./redux/IReduxState";
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
        // can we wrap somewhere else? e.g. in the app. This nested approach is not optimal.
        return <NetInfoChangedContainer />;
    }
}

const mapStateToProps = (state: IReduxState): Pick<Props, "lastUpdate"> => ({
    lastUpdate: state.app.lastUpdate,
});

const mapDispatchToProps: Pick<Props, "requestFetchPosts"> = {
    requestFetchPosts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStateChangedContainer);
