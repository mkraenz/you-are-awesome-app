import { FC, useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { connect } from "react-redux";
import { requestFetchMessages } from "../state/action-creators/requestFetchMessages";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { isToday } from "../utils/toTodayString";

interface StateProps {
    lastUpdate: Date;
}
interface DispatchProps {
    requestFetchMessages: (now: Date) => void;
}
type Props = StateProps & DispatchProps;

const AppStateChangedContainer: FC<Props> = ({
    lastUpdate,
    requestFetchMessages,
}) => {
    const handleAppStateChange = useCallback(
        (nextAppState: AppStateStatus) => {
            const isAnotherDay =
                nextAppState === "active" && !isToday(lastUpdate);
            if (isAnotherDay) {
                requestFetchMessages(new Date());
            }
        },
        [lastUpdate, requestFetchMessages]
    );

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);

        return () =>
            AppState.removeEventListener("change", handleAppStateChange);
    }, [handleAppStateChange]);
    return null;
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    lastUpdate: state.messages.lastUpdate,
});

const mapDispatchToProps: DispatchProps = {
    requestFetchMessages,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStateChangedContainer);
