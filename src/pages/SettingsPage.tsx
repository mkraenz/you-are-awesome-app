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
import { atTime } from "../utils/atTime";
import { INavigationProps } from "./INavigationProps";
import { askNotificationPermissions } from "./other/askNotificationPermissions";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    setNotificationsState: (enabled: boolean, scheduledTime: Date) => void;
    requestReadSettings: () => void;
    notificationsEnabled: boolean;
}

interface State {
    showTimePicker: boolean;
    scheduledDate: Date;
}

class SettingsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showTimePicker: false,
            scheduledDate: atTime(11, 0),
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
                <CheckBox
                    containerStyle={{ marginTop: 30 }}
                    textStyle={{ flex: 1 }}
                    center
                    title={this.getNotificationCheckboxTitle()}
                    iconRight
                    checked={this.props.notificationsEnabled}
                    onPress={() => this.handleNotificationsCheckboxPressed()}
                />
                <Button
                    containerStyle={{ padding: 10, margin: 15, height: 40 }}
                    title="Trigger test notification"
                    onPress={showNotification}
                    style={{ backgroundColor: "dodgerblue" }}
                />
                <Button
                    containerStyle={{ padding: 10, margin: 15, height: 40 }}
                    title="Set notification time"
                    onPress={() => this.setState({ showTimePicker: true })}
                    style={{ backgroundColor: "dodgerblue" }}
                />
                <DateTimePicker
                    isVisible={this.state.showTimePicker}
                    mode="time"
                    onConfirm={date => {
                        this.setState({
                            showTimePicker: false,
                            scheduledDate: date,
                        });
                    }}
                    onCancel={() => this.setState({ showTimePicker: false })}
                />
            </View>
        );
    }

    private getNotificationCheckboxTitle() {
        const base = "Enable daily notifications.";
        const addition = `\nNext on ${DateTime.fromJSDate(
            this.state.scheduledDate
        ).toLocaleString(DateTime.DATETIME_MED)}`;
        return this.props.notificationsEnabled ? `${base}${addition}` : base;
    }

    private async handleNotificationsCheckboxPressed() {
        await askNotificationPermissions();
        this.props.setNotificationsState(
            !this.props.notificationsEnabled,
            atTime(
                this.state.scheduledDate.getHours(),
                this.state.scheduledDate.getMinutes()
            )
        );
    }
}

const mapStateToProps = (
    state: Pick<IReduxState, "settings">
): Pick<Props, "notificationsEnabled"> => ({
    notificationsEnabled: state.settings.notificationsEnabled,
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

// for development
const addSeconds = (date: Date, seconds: number) => {
    const msToSec = 1000;
    return new Date(date.getTime() + seconds * msToSec);
};

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
