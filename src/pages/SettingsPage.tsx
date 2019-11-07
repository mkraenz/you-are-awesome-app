import { Notifications } from "expo";
import { DateTime } from "luxon";
import React, { Component } from "react";
import { View } from "react-native";
import { Button, CheckBox, Header, Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
import { todayOrTomorrow } from "../utils/todayOrTomorrow";
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
    }

    public render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name="arrow-back"
                            onPress={() => this.props.navigation.goBack()}
                            color={styles.header.color}
                        />
                    }
                    centerComponent={
                        <HeaderTitle style={styles.header}>
                            Settings
                        </HeaderTitle>
                    }
                ></Header>
                <View
                    style={{
                        marginTop: 20,
                        marginBottom: 10,
                        marginHorizontal: 15,
                    }}
                >
                    <NotificationsCheckbox
                        title={this.getNotificationCheckboxTitle()}
                        checked={this.props.notificationsEnabled}
                        onPress={() =>
                            this.handleNotificationsCheckboxPressed()
                        }
                    />
                </View>
                <Button
                    containerStyle={styles.buttonContainer}
                    title="Set notification time"
                    onPress={() => this.setState({ showTimePicker: true })}
                    style={styles.button}
                />
                <Button
                    containerStyle={styles.buttonContainer}
                    title="Trigger test notification"
                    onPress={showNotification}
                    style={styles.button}
                />
                <DateTimePicker
                    isVisible={this.state.showTimePicker}
                    mode="time"
                    onConfirm={date => this.handleTimePickerConfirm(date)}
                    onCancel={() => this.setState({ showTimePicker: false })}
                />
            </View>
        );
    }

    private handleTimePickerConfirm(date: Date) {
        this.setState({ showTimePicker: false });
        this.props.setNotificationsState(true, todayOrTomorrow(date));
    }

    private getNotificationCheckboxTitle() {
        const base = "Enable daily notifications.";
        const addition = `\nNext on ${DateTime.fromJSDate(
            this.props.scheduledTime
        ).toLocaleString(DateTime.DATETIME_MED)}`;
        return this.props.notificationsEnabled ? `${base}${addition}` : base;
    }

    private async handleNotificationsCheckboxPressed() {
        await askNotificationPermissions();
        let time = this.props.scheduledTime;
        if (time.getTime() === 0) {
            time = at11Am();
        }
        this.props.setNotificationsState(
            !this.props.notificationsEnabled,
            todayOrTomorrow(time)
        );
    }
}

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

const showNotification = async () => {
    await askNotificationPermissions();
    const id = await Notifications.presentLocalNotificationAsync({
        title: "You are Awesome App!",
        body: "An awesome test message! Btw, you're awesome! :)",
    });
    if (!id) {
        throw new Error(
            "Something went wrong while scheduling notifications. Please report to Mirco if you see this message. Ideally send a screenshot. You are helping me a lot! Thank you :)"
        );
    }
};

// for development
const addSeconds = (date: Date, seconds: number) => {
    const msToSec = 1000;
    return new Date(date.getTime() + seconds * msToSec);
};

const NotificationsCheckbox = (props: {
    title: string;
    onPress: () => void;
    checked: boolean;
}) => (
    <CheckBox
        containerStyle={[styles.button, { borderWidth: 0 }]}
        textStyle={{ flex: 1, color: "white" }}
        checkedColor="white"
        uncheckedColor="white"
        center
        title={props.title}
        iconRight
        checked={props.checked}
        onPress={props.onPress}
    />
);

const at11Am = (now = new Date()) =>
    new Date(todayOrTomorrow(now).setHours(11, 0, 0, 0));
