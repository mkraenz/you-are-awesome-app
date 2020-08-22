import { Language } from "../../localization/localization";
import { ActionType } from "./ActionType";
import { IAction, IActionWithPayload } from "./utils";

export type IAppAction =
    | IToggleDarkThemeAction
    | ISetPushNotificationsState
    | IChangePushNotificationTime
    | ISetLanguage;

export type IToggleDarkThemeAction = IAction<ActionType.ToggleDarkTheme>;

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
