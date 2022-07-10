import axios from "axios";
import { getExpoPushTokenAsync } from "expo-notifications";
import { ApiFeatureFlags, CONFIG } from "../config";

export const subscribeToPushNotifications = async (
    time: Date,
    disabledFlags: ApiFeatureFlags<"subscribePushNotifications"> = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.subscribePushNotifications) {
        if (process.env.NODE_ENV !== "test")
            console.log(
                "API call subscribePushNotifications disabled. Skipping"
            );
        return;
    }

    let token = await getExpoPushTokenAsync();
    await axios.put(
        CONFIG.uri.subscribeToPushNotifications,
        {
            token: token.data,
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes(),
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
