import axios from "axios";
import * as Notifications from "expo-notifications";
import { ApiFeatureFlags, CONFIG } from "../config";

export const unregisterFromPushNotifications = async (
    disabledFlags: ApiFeatureFlags<"unregisterPushNotifications"> = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.unregisterPushNotifications) {
        console.log(
            "API call unregisterFromPushNotifications disabled. Skipping"
        );
        return;
    }
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
