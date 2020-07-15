import { Route } from "./navigation/Route";

export const START_SCREEN: Route = Route.Home;
export const MAX_BACKOFF_IN_MS = 1000 * Math.pow(2, 3);
export const DEFAULT_NOTIFICATION_HOUR = 11;

// verbose name because async storage is like a production database.
// so trying to avoid name conflicts.
export enum StorageSchema {
    PushNotificationsEnabled = "@YouAreAwesomeApp:pushNotificationsEnabled",
    PushNotificationsScheduledTime = "@YouAreAwesomeApp:pushNotificationsScheduledTime",
}

export const notificationErrorMsg =
    "Something went wrong while scheduling notifications. Please report to Mirco if you see this message. Ideally send a screenshot. You are helping me a lot! Thank you :)";

export const URI = {
    FETCH_POSTS:
        "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
    SEND_POST:
        "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
    REGISTER_PUSH_NOTIFICATION:
        "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
    UNREGISTER_PUSH_NOTIFICATION:
        "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
};
