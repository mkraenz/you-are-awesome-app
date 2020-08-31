import axios from "axios";
import * as Notifications from "expo-notifications";
import { CONFIG } from "../config";

export const unregisterFromPushNotifications = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(
        CONFIG.uri.unregisterFromPushNotifications,
        {
            token: token.data,
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
};
