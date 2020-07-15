import { Component, ReactNode } from "react";
import { AppState, AppStateStatus } from "react-native";
import { connect } from "react-redux";
import { requestFetchMessages } from "../state/action-creators/requestFetchPosts";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { isToday } from "../utils/toTodayString";

interface Props {
    lastUpdate: Date;
    requestFetchMessages: (now: Date) => void;
    children: ReactNode;
}

class AppStateChangedContainer extends Component<Props> {
    public componentDidMount() {
        AppState.addEventListener("change", (state) =>
            this.handleAppStateChange(state)
        );
    }

    public componentWillUnmount() {
        AppState.removeEventListener("change", (state) =>
            this.handleAppStateChange(state)
        );
    }

    private handleAppStateChange(nextAppState: AppStateStatus) {
        const { lastUpdate, requestFetchMessages } = this.props;
        if (nextAppState === "active" && !isToday(lastUpdate)) {
            requestFetchMessages(new Date());
        }
    }

    public render() {
        return this.props.children;
    }
}

const mapStateToProps: MapStateToProps<Pick<Props, "lastUpdate">> = (
    state
) => ({
    lastUpdate: state.messages.lastUpdate,
});

const mapDispatchToProps: Pick<Props, "requestFetchMessages"> = {
    requestFetchMessages,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStateChangedContainer);
