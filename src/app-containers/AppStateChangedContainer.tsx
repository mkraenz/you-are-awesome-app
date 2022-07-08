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
    // TODO expo 45
    // EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.
    // at node_modules/react-native/Libraries/vendor/emitter/_EventEmitter.js:164:4 in EventEmitter#removeListener
    // at node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter.js:108:4 in removeListener
    // at node_modules/react-native/Libraries/AppState/AppState.js:147:8 in removeEventListener
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
