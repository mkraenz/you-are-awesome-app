export enum ActionType {
    PostsFetchFailed = "PostsFetchFailed",
    // TODO handle somehow (at least notify the user)
    PostsFetchFailedTimeoutExceeded = "PostsFetchFailedTimeoutExceeded",
    PostsFetchRequested = "PostsFetchRequested",
    PostsFetchSucceeded = "PostsFetchSucceeded",
    PostSendFailed = "PostSendFailed",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "PostSendFailedTimeoutExceeded",
    PostSendRequested = "PostSendRequested",
    PostSendSucceeded = "PostSendSucceeded",
    NetInfoChanged = "NetInfoChanged",
    SetPushNotificationsState = "SetPushNotificationsState",
    ChangePushNotificationTime = "ChangePushNotificationTime",
    ReadSettingsRequested = "ReadSettingsRequested",
    ReadSettingsSucceeded = "ReadSettingsSucceeded",
    ToggleDarkTheme = "ToggleDarkTheme",
}
