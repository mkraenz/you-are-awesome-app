import { FC, useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { connect } from "react-redux";
import { fetchMessagesRequested } from "../state/reducers/messageReducer";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { isToday } from "../utils/toTodayString";

interface StateProps {
    lastUpdate: Date;
}
interface DispatchProps {
    fetchMessagesRequested: (now: Date) => void;
}
type Props = StateProps & DispatchProps;

const AppStateChangedContainer: FC<Props> = ({
    lastUpdate,
    fetchMessagesRequested,
}) => {
    const handleAppStateChange = useCallback(
        (nextAppState: AppStateStatus) => {
            const isAnotherDay =
                nextAppState === "active" && !isToday(lastUpdate);
            if (isAnotherDay) {
                fetchMessagesRequested(new Date());
            }
        },
        [lastUpdate, fetchMessagesRequested]
    );

    useEffect(() => {
        const listener = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        return () => listener.remove();
    }, [handleAppStateChange]);
    return null;
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    lastUpdate: state.messages.lastUpdate,
});

const mapDispatchToProps: DispatchProps = {
    fetchMessagesRequested,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStateChangedContainer);
