import { Language } from "./localization/localization";
import { Route } from "./navigation/Route";

const prodConfig = {
    isProd: true,
    featureFlags: {
        analytics: true,
    },
    debugAnalytics: false,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        fetchMessages:
            "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
        reportInappropriateContent:
            "https://ha18mzq01f.execute-api.eu-central-1.amazonaws.com/prod/",
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
    },
};

const devConfig: typeof prodConfig = {
    isProd: false,
    featureFlags: {
        analytics: false,
    },
    debugAnalytics: true,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        fetchMessages:
            "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
        reportInappropriateContent:
            "https://ha18mzq01f.execute-api.eu-central-1.amazonaws.com/prod/",
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
    },
};

const isProd = process.env.NODE_ENV === "prod" || false;
export const CONFIG = isProd ? prodConfig : devConfig;
