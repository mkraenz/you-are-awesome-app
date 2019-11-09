import { Navigation } from "./Navigation";

export const MAX_BACKOFF_IN_MS = 1000 * Math.pow(2, 3);
export const NOTIFICATION_HOUR = 11;
export const NOTIFICATION_MIN = 0;

export enum StorageSchema {
    LocalNotificationsEnabled = "@YouAreAwesomeApp:localNotificationsEnabled",
    LocalNotificationsScheduledTime = "@YouAreAwesomeApp:localNotificationsScheduledTime",
}

export const notificationErrorMsg =
    "Something went wrong while scheduling notifications. Please report to Mirco if you see this message. Ideally send a screenshot. You are helping me a lot! Thank you :)";

export const START_SCREEN = Navigation.Settings;
