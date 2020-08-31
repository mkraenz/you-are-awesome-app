import { Language } from "./localization/localization";
import { Route } from "./navigation/Route";

const prodConfig = {
    isProd: true,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    enableAnalytics: true,
    debugAnalytics: false,
    uri: {
        fetchMessages:
            "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
    },
};

const devConfig: typeof prodConfig = {
    isProd: false,
    fallbackLanguage: Language.English,
    startScreen: Route.Home,
    defaultNotificationHour: 11,
    enableAnalytics: true,
    debugAnalytics: true,
    uri: {
        fetchMessages:
            "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
        submitContribution:
            "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
        registerForPushNotifications:
            "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
        unregisterFromPushNotifications:
            "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
    },
};

// WARNING: Always revert changes to this before deploying / merging.
const isProd = true; // should be true for merges / deployments
export const CONFIG = isProd ? prodConfig : devConfig;
