import * as Permissions from "expo-permissions";

export const askNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
    }
    if (finalStatus !== "granted") {
        return false;
    }
    return true;
};
