import { Notifications } from "expo";
import { REGISTER_PUSH_NOTIFICATION_URI } from "../redux/reducers/postReducer";

export const registerForPushNotifications = async (time: Date) => {
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(REGISTER_PUSH_NOTIFICATION_URI, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            hour: time.getHours(),
            minute: time.getMinutes(),
        }),
    });
};
