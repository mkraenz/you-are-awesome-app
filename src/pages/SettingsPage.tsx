import { Notifications } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import { Button, CheckBox, Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { NOTIFICATION_HOUR, NOTIFICATION_MIN } from "../config";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
import { atTime } from "../utils/atTime";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    setNotificationsState: (enabled: boolean, scheduledTime: Date) => void;
    requestReadSettings: () => void;
    notificationsEnabled: boolean;
}

class SettingsPage extends Component<Props> {
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
                    title="Enable daily notifications at 11 AM"
                    iconRight
                    checked={this.props.notificationsEnabled}
                    onPress={() => {
                        this.props.setNotificationsState(
                            !this.props.notificationsEnabled,
                            atTime(NOTIFICATION_HOUR, NOTIFICATION_MIN)
                        );
                    }}
                />
                <Button
                    containerStyle={{ padding: 10, margin: 15, height: 40 }}
                    title="Trigger test notification"
                    onPress={() => this.handleTestNotificationButtonPressed()}
                    style={{
                        backgroundColor: "dodgerblue",
                    }}
                />
            </View>
        );
    }

    private async handleTestNotificationButtonPressed() {
        const id = await Notifications.presentLocalNotificationAsync({
            title: "You are Awesome App!",
            body: "A new awesome message! Btw, you're awesome! :)",
        });
        if (!id) {
            throw new Error(
                "Something went wrong while scheduling notifications. Please report to Mirco if you see this message. Ideally send a screenshot. You are helping me a lot! Thank you :)"
            );
        }
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
