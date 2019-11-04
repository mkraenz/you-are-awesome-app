import React, { Component } from "react";
import { View } from "react-native";
import { CheckBox, Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NOTIFICATION_HOUR, NOTIFICATION_MIN } from "../config";
import {
    IReadSettingsRequested,
    ISetNotificationsState,
} from "../redux/Actions";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import { atTime } from "../utils/atTime";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    setNotificationsState: (enabled: boolean) => void;
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
                    onPress={() =>
                        this.props.setNotificationsState(
                            !this.props.notificationsEnabled
                        )
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (
    state: Pick<IReduxState, "settings">
): Pick<Props, "notificationsEnabled"> => ({
    notificationsEnabled: state.settings.notificationsEnabled,
});

const mapDispatchToProps = (
    dispatch: Dispatch
): Pick<Props, "setNotificationsState" | "requestReadSettings"> => ({
    setNotificationsState: (enabled: boolean): ISetNotificationsState =>
        dispatch({
            type: ReduxAction.SetNotificationsState,
            payload: {
                enabled,
                scheduledTime: atTime(NOTIFICATION_HOUR, NOTIFICATION_MIN),
            },
        }),
    requestReadSettings: (): IReadSettingsRequested =>
        dispatch({ type: ReduxAction.ReadSettingsRequested }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);

// for development
// const addSeconds = (date: Date, seconds: number) => {
//     const msToSec = 1000;
//     return new Date(date.getTime() + seconds * msToSec);
// };
