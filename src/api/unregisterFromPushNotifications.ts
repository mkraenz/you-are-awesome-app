import { Notifications } from "expo";
import { URI } from "../config";

export const unregisterFromPushNotifications = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(URI.UNREGISTER_PUSH_NOTIFICATION, {
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
