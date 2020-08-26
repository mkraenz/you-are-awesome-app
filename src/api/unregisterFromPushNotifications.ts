import axios from "axios";
import * as Notifications from "expo-notifications";
import { URI } from "../config";

export const unregisterFromPushNotifications = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(
        URI.UNREGISTER_PUSH_NOTIFICATION,
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
