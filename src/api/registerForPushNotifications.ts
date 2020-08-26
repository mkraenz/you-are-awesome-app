import axios from "axios";
import { getExpoPushTokenAsync } from "expo-notifications";
import { URI } from "../config";

export const registerForPushNotifications = async (time: Date) => {
    let token = await getExpoPushTokenAsync();
    await axios.post(
        URI.REGISTER_PUSH_NOTIFICATION,
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
