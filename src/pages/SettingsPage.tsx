import React, { Component } from "react";
import { View } from "react-native";
import { CheckBox, Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { requestReadSettings } from "../redux/action-creators/requestReadSettings";
import { setNotificationsState } from "../redux/action-creators/setNotificationState";
import { IReduxState } from "../redux/IReduxState";
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
// const addSeconds = (date: Date, seconds: number) => {
//     const msToSec = 1000;
//     return new Date(date.getTime() + seconds * msToSec);
// };
