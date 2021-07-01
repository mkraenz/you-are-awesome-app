import Constants from "expo-constants";
import { Language } from "./localization/localization";
import { Route } from "./navigation/Route";

const shared = {
    uri: {
        fetchMessages:
            "https://youareawesomeapp-current-message.s3.eu-central-1.amazonaws.com/messages.json",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://9vaneth5dj.execute-api.eu-central-1.amazonaws.com/prod/push-notifications/register",
        unregisterFromPushNotifications:
            "https://9vaneth5dj.execute-api.eu-central-1.amazonaws.com/prod/push-notifications/unregister",
        reportInappropriateContent:
            "https://9vaneth5dj.execute-api.eu-central-1.amazonaws.com/prod/reportinappropriate",
        playstoreUrl:
            "https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp",
        feedbackForm:
            "https://docs.google.com/forms/d/e/1FAIpQLSdheSDuk56z1NaNVjDIaDLpiO4GZj2ZXcoHlQxIIpRREFioTA/viewform?usp=pp_url&entry.809955830=",
    },
};

const prodConfig = {
    isProdOrStage: true,
    env: "prod",
    featureFlags: {
        analytics: true,
        developerSettings: false,
        bugReportIconVisible: true,
    },
    debugAnalytics: false,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        ...shared.uri,
    },
    sentry: {
        debug: false,
        dns: "https://64c0312c92834266b10fb04c7395fcac@o508307.ingest.sentry.io/5600625",
        environment: "production",
        reportFromExpoClient: false,
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
        submitContribution: false,
    },
};

const stageConfig: typeof prodConfig = {
    isProdOrStage: true,
    env: "stage",
    featureFlags: {
        analytics: true,
        developerSettings: true,
        bugReportIconVisible: true,
    },
    debugAnalytics: false,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        ...shared.uri,
    },
    sentry: {
        debug: false,
        dns: "https://64c0312c92834266b10fb04c7395fcac@o508307.ingest.sentry.io/5600625",
        environment: "stage",
        reportFromExpoClient: false,
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
        submitContribution: false,
    },
};

const devConfig: typeof prodConfig = {
    isProdOrStage: false,
    env: "dev",
    featureFlags: {
        analytics: true,
        developerSettings: true,
        bugReportIconVisible: true,
    },
    debugAnalytics: true,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    uri: {
        ...shared.uri,
    },
    sentry: {
        debug: true,
        dns: "https://64c0312c92834266b10fb04c7395fcac@o508307.ingest.sentry.io/5600625",
        environment: "dev",
        reportFromExpoClient: true,
    },
    disableApiCall: {
        all: false,
        reportInappropriateContent: false,
        submitContribution: false,
    },
};

const getEnvConfig = () => {
    switch (Constants.manifest.extra?.env) {
        case "prod":
            return prodConfig;
        case "stage":
            return stageConfig;
        case "dev":
        default:
            return devConfig;
    }
};

export const CONFIG = getEnvConfig();
