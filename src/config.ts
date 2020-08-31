import { Language } from "./localization/localization";
import { Route } from "./navigation/Route";

export const DEFAULT_LANGUAGE = Language.English;
export const START_SCREEN: Route = Route.Home;
export const DEFAULT_NOTIFICATION_HOUR = 11;

export const URI = {
    FETCH_MESSAGES:
        "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false",
    SEND_MESSAGES:
        "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib",
    REGISTER_PUSH_NOTIFICATION:
        "https://opxwo1lkzg.execute-api.eu-central-1.amazonaws.com/prod/",
    UNREGISTER_PUSH_NOTIFICATION:
        "https://6b6zfu36x6.execute-api.eu-central-1.amazonaws.com/prod/",
};
