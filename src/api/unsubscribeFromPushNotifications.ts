import axios from "axios";
import * as Notifications from "expo-notifications";
import { ApiFeatureFlags, CONFIG } from "../config";

export const unsubscribeFromPushNotifications = async (
    disabledFlags: ApiFeatureFlags<"unsubscribePushNotifications"> = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.unsubscribePushNotifications) {
        console.log("API call unsubscribePushNotifications disabled. Skipping");
        return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(
        CONFIG.uri.unsubscribeFromPushNotifications,
        {
            token: token.data,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
