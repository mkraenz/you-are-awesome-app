import * as Notifications from "expo-notifications";
import { URI } from "../config";

export const registerForPushNotifications = async (time: Date) => {
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(URI.REGISTER_PUSH_NOTIFICATION, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes(),
        }),
    });
};
