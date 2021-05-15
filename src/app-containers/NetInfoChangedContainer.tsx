import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { changeNetInfo } from "../state/action-creators/changeNetInfo";
import { IState } from "../state/state/IState";

interface Props {
    changeNetInfo: (connected: boolean) => void;
    children: ReactNode;
}

class NetInfoChangedContainer extends Component<Props> {
    private unsubscribe?: NetInfoSubscription;

    public componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener((state) =>
            this.props.changeNetInfo(!!state.isConnected)
        );
    }

    public componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    public render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps: Pick<Props, "changeNetInfo"> = { changeNetInfo };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NetInfoChangedContainer);
