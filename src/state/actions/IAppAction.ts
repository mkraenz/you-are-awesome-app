import { Language } from "../../localization/localization";
import { ActionType } from "./ActionType";
import { IAction, IActionWithPayload } from "./utils";

export type IAppAction =
    | IToggleDarkThemeAction
    | IToggleAnalytics
    | ISetPushNotificationsState
    | IChangePushNotificationTime
    | ISetLanguage;

export type IToggleDarkThemeAction = IAction<ActionType.ToggleDarkTheme>;
export type IToggleAnalytics = IAction<ActionType.ToggleAnalytics>;

export type ISetPushNotificationsState = IActionWithPayload<
    ActionType.SetPushNotificationsState,
    {
        enabled: boolean;
        scheduledTime: Date;
    }
>;

export type IChangePushNotificationTime = IActionWithPayload<
    ActionType.ChangePushNotificationTime,
    {
        scheduledTime: Date;
    }
>;

export type ISetLanguage = IActionWithPayload<
    ActionType.SetLanguage,
    { language: Language }
>;
