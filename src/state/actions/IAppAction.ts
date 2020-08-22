import { ActionType } from "./ActionType";
import { IAction, IActionWithPayload } from "./utils";

export type IAppAction =
    | IToggleDarkThemeAction
    | ISetPushNotificationsState
    | IChangePushNotificationTime;

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
