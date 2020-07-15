import { StorageSchema } from "../../../config";

interface ISettings {
    [StorageSchema.PushNotificationsEnabled]: string | null | undefined;
    [StorageSchema.PushNotificationsScheduledTime]: string | null | undefined;
}
export const deserialize = (settings: ISettings) => {
    const serializedEnabled = settings[StorageSchema.PushNotificationsEnabled];
    const serializedDate =
        settings[StorageSchema.PushNotificationsScheduledTime];
    const enabled = serializedEnabled
        ? Boolean(JSON.parse(serializedEnabled))
        : false;
    const foundDate = serializedDate ? new Date(serializedDate) : new Date(0);
    const isValidDate = !isNaN(foundDate.getTime());
    return {
        enabled,
        // TODO #35 somehow this is in UTC
        scheduledTime: isValidDate ? foundDate : new Date(0),
    };
};
