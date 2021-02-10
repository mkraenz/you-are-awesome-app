import Constants from "expo-constants";
import { Language } from "./localization/localization";
import { Route } from "./navigation/Route";

const prodConfig = {
    isProd: true,
    env: "prod",
    featureFlags: {
        analytics: true,
        developerSettings: false,
    },
    debugAnalytics: false,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        fetchMessages:
            "https://t1sy9ka9nf.execute-api.eu-central-1.amazonaws.com/prod/?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
        reportInappropriateContent:
            "https://ha18mzq01f.execute-api.eu-central-1.amazonaws.com/prod/",
    },
    sentry: {
        debug: false,
        dns:
            "https://64c0312c92834266b10fb04c7395fcac@o508307.ingest.sentry.io/5600625",
        environment: "production",
        reportFromExpoClient: false,
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
        submitContribution: false,
    },
};

const devConfig: typeof prodConfig = {
    isProd: false,
    env: "dev",
    featureFlags: {
        analytics: true,
        developerSettings: true,
    },
    debugAnalytics: true,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        fetchMessages:
            "https://t1sy9ka9nf.execute-api.eu-central-1.amazonaws.com/prod/?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
        reportInappropriateContent:
            "https://ha18mzq01f.execute-api.eu-central-1.amazonaws.com/prod/",
    },
    sentry: {
        debug: true,
        dns:
            "https://64c0312c92834266b10fb04c7395fcac@o508307.ingest.sentry.io/5600625",
        environment: "dev",
        reportFromExpoClient: true,
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
        submitContribution: false,
    },
};

const isProd = Constants.manifest.extra.env === "prod";
export const CONFIG = isProd ? prodConfig : devConfig;
