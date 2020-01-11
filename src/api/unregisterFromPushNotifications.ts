import { Notifications } from "expo";
import { UNREGISTER_PUSH_NOTIFICATION_URI } from "../redux/reducers/postReducer";

export const unregisterFromPushNotifications = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(UNREGISTER_PUSH_NOTIFICATION_URI, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    });
};
