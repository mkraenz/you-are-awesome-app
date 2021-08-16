import NetInfo from "@react-native-community/netinfo";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { changeNetInfo } from "../state/action-creators/changeNetInfo";
import { IState } from "../state/state/IState";

interface Props {
    changeNetInfo: (connected: boolean) => void;
}

const NetInfoChangedContainer: FC<Props> = ({ changeNetInfo }) => {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) =>
            changeNetInfo(!!state.isConnected)
        );
        return unsubscribe;
    }, [changeNetInfo]);
    return null;
};

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps: Props = { changeNetInfo };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NetInfoChangedContainer);
