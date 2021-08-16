import React, { FC, ReactNode, useCallback, useEffect } from "react";
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
type Props = StateProps &
    DispatchProps & {
        children: ReactNode;
    };

const AppStateChangedContainer: FC<Props> = ({
    lastUpdate,
    requestFetchMessages,
    children,
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
    return <>{children}</>;
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
