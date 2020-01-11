import { Notifications } from "expo";
import { Component } from "react";

interface Props {}

class ReceivePushNotificationsContainer extends Component<Props> {
    public componentDidMount() {
        Notifications.addListener(notification =>
            console.log(`received notification ${JSON.stringify(notification)}`)
        );
    }

    public render() {
        return this.props.children;
    }
}

export default ReceivePushNotificationsContainer;
