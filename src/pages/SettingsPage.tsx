import React, { Component, FC } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { changePushNotificationTime } from "../redux/action-creators/changePushNotificationTime";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
import NotificationsEnabledCheckbox from "./components/NotificationsEnabledCheckbox";
import SettingsHeader from "./components/SettingsHeader";
import { INavigationProps } from "./INavigationProps";
import { askNotificationPermissions } from "./other/askNotificationPermissions";
import { styles } from "./Styles";

interface DispatchProps {
    setNotificationsState: (enabled: boolean, scheduledTime: Date) => void;
    changePushNotificationTime: (scheduledTime: Date) => void;
    requestReadSettings: () => void;
}

interface Props extends INavigationProps, DispatchProps {
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
                <DateTimePicker
                    isVisible={this.state.showTimePicker}
                    mode="time"
                    onConfirm={date => this.handleTimePickerConfirm(date)}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    date={this.props.scheduledTime}
                />
            </View>
        );
    }

    private handleTimePickerConfirm(date: Date) {
        this.setState({ showTimePicker: false });
        if (this.props.notificationsEnabled) {
            this.props.changePushNotificationTime(date);
        } else {
            this.props.setNotificationsState(true, date);
        }
    }

    private async handleNotificationsCheckboxPressed() {
        let time = this.props.scheduledTime;
        if (time.getTime() === 0) {
            time = at11Am();
        }
        await askNotificationPermissions();
        this.props.setNotificationsState(
            !this.props.notificationsEnabled,
            time
        );
    }
}

const at11Am = (now = new Date()) => new Date(now.setHours(11, 0, 0, 0));

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

const mapDispatchToProps: DispatchProps = {
    setNotificationsState,
    requestReadSettings,
    changePushNotificationTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
