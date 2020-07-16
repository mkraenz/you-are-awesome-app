import { ActionType } from "./ActionType";
import { IAction, IActionWithPayload } from "./utils";

export type IAppAction =
    | IToggleDarkThemeAction
    | ISetPushNotificationsState
    | IChangePushNotificationTime
    | IReadSettingsSucceeded
    | IReadSettingsRequested;

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

export type IReadSettingsRequested = IAction<ActionType.ReadSettingsRequested>;

export type IReadSettingsSucceeded = IActionWithPayload<
    ActionType.ReadSettingsSucceeded,
    {
        enabled: boolean;
        scheduledTime: Date;
    }
>;
