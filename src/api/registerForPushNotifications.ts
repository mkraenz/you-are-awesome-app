import axios from "axios";
import { getExpoPushTokenAsync } from "expo-notifications";
import { CONFIG } from "../config";

export const registerForPushNotifications = async (time: Date) => {
    let token = await getExpoPushTokenAsync();
    await axios.post(
        CONFIG.uri.registerForPushNotifications,
        {
            token: token.data,
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes(),
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
};
