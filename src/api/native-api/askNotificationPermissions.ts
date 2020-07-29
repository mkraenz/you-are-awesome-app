import * as Notifications from "expo-notifications";

export const askNotificationPermissions = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
        return true;
    }
    const status = await Notifications.requestPermissionsAsync();
    return status.granted;
};
