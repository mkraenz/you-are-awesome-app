import { DateTime } from "luxon";
import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { IReduxState } from "../../redux/IReduxState";
import { styles } from "../Styles";

interface Props {
    onPress: () => void;
    notificationsEnabled: boolean;
    scheduledTime: Date;
}

class NotificationsEnabledCheckbox extends Component<Props> {
    public render() {
        return (
            <CheckBox
                containerStyle={[styles.button, { borderWidth: 0 }]}
                textStyle={{ flex: 1, color: "white" }}
                checkedColor="white"
                uncheckedColor="white"
                center
                title={this.getTitle()}
                iconRight
                checked={this.props.notificationsEnabled}
                onPress={this.props.onPress}
            />
        );
    }

    private getTitle() {
        const base = "Enable daily notifications";
        const addition = `\nNext at ${DateTime.fromJSDate(
            this.props.scheduledTime
        )
            .toLocaleString(DateTime.DATETIME_MED)
            .slice(-8)
            .trim()}`;
        return this.props.notificationsEnabled ? `${base}${addition}` : base;
    }
}

const mapStateToProps = (
    state: Pick<IReduxState, "settings">
): Pick<Props, "notificationsEnabled" | "scheduledTime"> => ({
    notificationsEnabled: state.settings.notificationsEnabled,
    scheduledTime: state.settings.scheduledTime,
});

export default connect(mapStateToProps)(NotificationsEnabledCheckbox);
