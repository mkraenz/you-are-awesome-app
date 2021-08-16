import axios from "axios";
import { getExpoPushTokenAsync } from "expo-notifications";
import { ApiFeatureFlags, CONFIG } from "../config";

export const registerForPushNotifications = async (
    time: Date,
    disabledFlags: ApiFeatureFlags<"registerPushNotifications"> = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.registerPushNotifications) {
        console.log("API call registerPushNotifications disabled. Skipping");
        return;
    }

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
