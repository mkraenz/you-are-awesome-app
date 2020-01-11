import React, { Component, FC } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { changePushNotificationTime } from "../redux/action-creators/changePushNotificationTime";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
import version from "../utils/version.json";
import NotificationsEnabledCheckbox from "./components/NotificationsEnabledCheckbox";
import OfflineNotice from "./components/OfflineNotice";
import SettingsHeader from "./components/SettingsHeader";
import { INavigationProps } from "./INavigationProps";
import { askNotificationPermissions } from "./other/askNotificationPermissions";
import { styles } from "./Styles";

const FREEZE_BUTTON_TIMEOUT = 2000;
const FREEZE_BUTTON_TIMEOUT_LONG = 8000;

interface DispatchProps {
    setNotificationsState: (enabled: boolean, scheduledTime: Date) => void;
    changePushNotificationTime: (scheduledTime: Date) => void;
    requestReadSettings: () => void;
}

interface IStateProps {
    notificationsEnabled: boolean;
    scheduledTime: Date;
    connectedToInternet: boolean;
}
type Props = INavigationProps & DispatchProps & IStateProps;

interface State {
    showTimePicker: boolean;
    freezeButtons: boolean;
}

class SettingsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showTimePicker: false,
            freezeButtons: false,
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
                {!this.props.connectedToInternet && <OfflineNotice />}
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
                <Text style={{ marginHorizontal: 30 }}>
                    Build Version: {version.jsBuildNumber}
                </Text>
            </View>
        );
    }

    private async handleTimePickerConfirm(date: Date) {
        if (this.state.freezeButtons) {
            return;
        }
        if (!this.props.connectedToInternet) {
            alert("Internet connection required");
            return;
        }
        this.toggleFreezeButtons();
        this.setState({ showTimePicker: false });
        await askNotificationPermissions();
        if (this.props.notificationsEnabled) {
            this.props.changePushNotificationTime(date);
        } else {
            this.props.setNotificationsState(true, date);
        }
        setTimeout(
            () => this.toggleFreezeButtons(),
            FREEZE_BUTTON_TIMEOUT_LONG
        );
    }

    private async handleNotificationsCheckboxPressed() {
        if (this.state.freezeButtons) {
            return;
        }
        if (!this.props.connectedToInternet) {
            alert("Internet connection required");
            return;
        }
        this.toggleFreezeButtons();
        let time = this.props.scheduledTime;
        if (time.getTime() === 0) {
            time = at11Am();
        }
        await askNotificationPermissions();
        this.props.setNotificationsState(
            !this.props.notificationsEnabled,
            time
        );
        setTimeout(() => this.toggleFreezeButtons(), FREEZE_BUTTON_TIMEOUT);
    }

    private toggleFreezeButtons() {
        this.setState({ freezeButtons: !this.state.freezeButtons });
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
    state: Pick<IReduxState, "settings" | "netInfo">
): IStateProps => ({
    notificationsEnabled: state.settings.notificationsEnabled,
    scheduledTime: state.settings.scheduledTime,
    connectedToInternet: state.netInfo.connected,
});

const mapDispatchToProps: DispatchProps = {
    setNotificationsState,
    requestReadSettings,
    changePushNotificationTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
