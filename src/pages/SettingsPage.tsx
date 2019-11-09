import { Notifications } from "expo";
import React, { Component, FC } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { notificationErrorMsg } from "../config";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
import { futureOrTodayOrTomorrow } from "../utils/futureOrTodayOrTomorrow";
import { timeWithTodaysDate } from "../utils/timeWithTodaysDate";
import NotificationsEnabledCheckbox from "./components/NotificationsEnabledCheckbox";
import SettingsHeader from "./components/SettingsHeader";
import { INavigationProps } from "./INavigationProps";
import { askNotificationPermissions } from "./other/askNotificationPermissions";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    setNotificationsState: (enabled: boolean, scheduledTime: Date) => void;
    requestReadSettings: () => void;
    notificationsEnabled: boolean;
    scheduledTime: Date;
}

interface State {
    showTimePicker: boolean;
}

class SettingsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showTimePicker: false,
        };
        ``;
    }

    public componentDidMount() {
        this.props.requestReadSettings();
        setTimeout(() => {
            const props = this.props;
            if (
                props.notificationsEnabled &&
                props.scheduledTime <= new Date()
            ) {
                props.setNotificationsState(
                    props.notificationsEnabled,
                    futureOrTodayOrTomorrow(props.scheduledTime)
                );
            }
        }, 1000);
    }

    public render() {
        return (
            <View style={styles.container}>
                <SettingsHeader navigation={this.props.navigation} />
                <View
                    style={{
                        marginTop: 20,
                        marginBottom: 10,
                        marginHorizontal: 15,
                    }}
                >
                    <NotificationsEnabledCheckbox
                        onPress={() =>
                            this.handleNotificationsCheckboxPressed()
                        }
                    />
                </View>
                <SetNotificationTimeButton
                    onPress={() => this.setState({ showTimePicker: true })}
                />
                <TriggerTestNotificationButton />
                <DateTimePicker
                    isVisible={this.state.showTimePicker}
                    mode="time"
                    onConfirm={date => this.handleTimePickerConfirm(date)}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    date={timeWithTodaysDate(this.props.scheduledTime)}
                />
            </View>
        );
    }

    private handleTimePickerConfirm(date: Date) {
        this.setState({ showTimePicker: false });
        this.props.setNotificationsState(true, futureOrTodayOrTomorrow(date));
    }

    private async handleNotificationsCheckboxPressed() {
        let time = this.props.scheduledTime;
        if (time.getTime() === 0) {
            time = at11Am();
        }
        await askNotificationPermissions();
        this.props.setNotificationsState(
            !this.props.notificationsEnabled,
            futureOrTodayOrTomorrow(time)
        );
    }
}

const showNotification = async () => {
    await askNotificationPermissions();
    const id = await Notifications.presentLocalNotificationAsync({
        title: "Awesome!",
        body: "Notifications work on your phone. Btw, you're awesome! :)",
    });
    if (!id) {
        throw new Error(notificationErrorMsg);
    }
};

const at11Am = (now = new Date()) =>
    new Date(futureOrTodayOrTomorrow(now).setHours(11, 0, 0, 0));

const TriggerTestNotificationButton: FC = () => (
    <Button
        containerStyle={[styles.buttonContainer]}
        title="Trigger test notification"
        onPress={showNotification}
        style={styles.button}
        icon={
            <Icon
                name="notification"
                type="antdesign"
                size={25}
                color="white"
            />
        }
    />
);

const SetNotificationTimeButton: FC<{ onPress: () => void }> = props => (
    <Button
        containerStyle={styles.buttonContainer}
        title="Set notification time"
        onPress={props.onPress}
        style={styles.button}
        icon={<Icon name="schedule" size={25} color="white" />}
    />
);

const mapStateToProps = (
    state: Pick<IReduxState, "settings">
): Pick<Props, "notificationsEnabled" | "scheduledTime"> => ({
    notificationsEnabled: state.settings.notificationsEnabled,
    scheduledTime: state.settings.scheduledTime,
});

const mapDispatchToProps: Pick<
    Props,
    "setNotificationsState" | "requestReadSettings"
> = {
    setNotificationsState,
    requestReadSettings,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);
