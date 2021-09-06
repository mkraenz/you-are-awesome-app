import { debounce } from "lodash";
import { DateTime } from "luxon";
import React, { FC, useState } from "react";
import { View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Divider, Subheading, Switch } from "react-native-paper";
import { connect } from "react-redux";
import { changePushNotificationTime } from "../../state/action-creators/changePushNotificationTime";
import { setPushNotificationsState } from "../../state/action-creators/setPushNotificationState";
import { MapStateToProps } from "../../state/state/MapStateToProps";
import { useTranslation } from "../../utils/useTranslation";
import { at11Am } from "./at11am";
import SettingsRow from "./SettingsRow";

const DEBOUNCE_TIMEOUT = 500;

interface IStateProps {
    enabled: boolean;
    scheduledTime: Date;
    connectedToInternet: boolean;
}

interface IDispatchProps {
    setNotificationsState: typeof setPushNotificationsState;
    changePushNotificationTime: typeof changePushNotificationTime;
}

type Props = IStateProps & IDispatchProps;

const PushNotificationSettings: FC<Props> = ({
    changePushNotificationTime,
    connectedToInternet,
    enabled,
    scheduledTime,
    setNotificationsState,
}) => {
    const { t } = useTranslation();
    const [openTimepicker, setOpen] = useState(false);
    const disabled = !connectedToInternet;

    const toggleNotifications = debounce(() => {
        const newScheduledTime = getScheduledTimeOrDefault(scheduledTime);
        setNotificationsState(!enabled, newScheduledTime);
    }, DEBOUNCE_TIMEOUT);
    const setNotificationTime = debounce((date: Date) => {
        setOpen(false);
        changePushNotificationTime(date);
    }, DEBOUNCE_TIMEOUT);
    const scheduledTime_ = DateTime.fromJSDate(scheduledTime);

    const renderNotificationTimeRight =
        (disabledStyle: { color?: string }) => () => {
            if (enabled) {
                return (
                    <Subheading style={disabledStyle}>
                        {scheduledTime_.toLocaleString(DateTime.TIME_SIMPLE)}
                    </Subheading>
                );
            } else <></>;
        };

    return (
        <View>
            <SettingsRow
                title={t("notificationsEnable")}
                onPress={toggleNotifications}
                rightComponent={() => () =>
                    (
                        <Switch
                            value={enabled}
                            disabled={disabled}
                            onValueChange={toggleNotifications}
                        ></Switch>
                    )}
                disabled={disabled}
            ></SettingsRow>
            <SettingsRow
                title={t("notificationsSetTime")}
                onPress={() => setOpen(true)}
                rightComponent={renderNotificationTimeRight}
                disabled={!enabled || disabled}
            ></SettingsRow>

            <DateTimePicker
                isVisible={openTimepicker}
                mode="time"
                onConfirm={setNotificationTime}
                onCancel={() => setOpen(false)}
                date={new Date(scheduledTime)}
            />
            <Divider />
        </View>
    );
};

const getScheduledTimeOrDefault = (scheduledTime: Date) =>
    scheduledTime.getTime() === 0 ? at11Am() : scheduledTime;

const mapStateToProps: MapStateToProps<IStateProps> = (state) => ({
    enabled: state.app.pushNotificationsEnabled,
    scheduledTime: state.app.pushNotificationsScheduledTime,
    connectedToInternet: state.network.connected,
});

const mapDispatchToProps: IDispatchProps = {
    setNotificationsState: setPushNotificationsState,
    changePushNotificationTime,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PushNotificationSettings);
