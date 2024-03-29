import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { at11Am } from "../components/settings/at11am";
import { setPushNotificationsState } from "../state/action-creators/setPushNotificationState";
import { toggleOnboardingCompleted } from "../state/action-creators/toggleOnboardingCompleted";
import { MapStateToProps } from "../state/state/MapStateToProps";

interface StateProps {
    onboardingCompleted: boolean;
    pushNotificationsEnabled: boolean;
    internetConnected: boolean;
}
interface DispatchProps {
    setPushNotificationsState: typeof setPushNotificationsState;
    toggleOnboardingCompleted: () => void;
}
type Props = StateProps & DispatchProps;

const OnboardingContainer: FC<Props> = ({
    onboardingCompleted,
    pushNotificationsEnabled,
    setPushNotificationsState,
    toggleOnboardingCompleted,
    internetConnected,
}) => {
    useEffect(() => {
        if (!internetConnected) return;
        if (onboardingCompleted) return;
        if (pushNotificationsEnabled) return;

        // TODO iOS this might not work due to required permissions for push notifications
        setPushNotificationsState(true, at11Am());
        toggleOnboardingCompleted();
    }, [
        onboardingCompleted,
        setPushNotificationsState,
        toggleOnboardingCompleted,
        internetConnected,
    ]);

    return null;
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    onboardingCompleted: state.app.onboardingCompleted,
    pushNotificationsEnabled: state.app.pushNotificationsEnabled,
    internetConnected: state.network.connected,
});

const mapDispatchToProps: DispatchProps = {
    setPushNotificationsState,
    toggleOnboardingCompleted,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingContainer);
