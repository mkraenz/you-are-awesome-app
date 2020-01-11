import { Component } from "react";
import { NetInfo } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { INetInfoChanged } from "./redux/Actions";
import { IReduxState } from "./redux/IReduxState";
import { ReduxAction } from "./redux/ReduxAction";

interface Props {
    changeNetInfo: (connected: boolean) => void;
}

class NetInfoChangedContainer extends Component<Props> {
    public componentDidMount() {
        NetInfo.isConnected.addEventListener("connectionChange", connected =>
            this.props.changeNetInfo(connected)
        );
    }

    public componentWillUnmount() {
        NetInfo.isConnected.removeEventListener("connectionChange", connected =>
            this.props.changeNetInfo(connected)
        );
    }

    public render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: IReduxState) => state;

const mapDispatcherToProps = (dispatch: Dispatch): Props => ({
    changeNetInfo: (connected: boolean): INetInfoChanged =>
        dispatch({ type: ReduxAction.NetInfoChanged, payload: { connected } }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(NetInfoChangedContainer);
