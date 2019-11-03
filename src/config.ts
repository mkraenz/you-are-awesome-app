export const MAX_BACKOFF_IN_MS = 1000 * Math.pow(2, 3);

export enum StorageSchema {
    LocalNotificationsEnabled = "@YouAreAwesomeApp:localNotificationsEnabled",
    LocalNotificationsScheduledTime = "@YouAreAwesomeApp:localNotificationsScheduledTime",
}
