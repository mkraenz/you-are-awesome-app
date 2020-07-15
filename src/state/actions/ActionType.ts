export enum ActionType {
    FetchMessagesFailed = "FetchMessagesFailed",
    // TODO handle somehow (at least notify the user)
    FetchMessagesFailedTimeoutExceeded = "FetchMessagesFailedTimeoutExceeded",
    FetchMessagesRequested = "FetchMessagesRequested",
    FetchMessagesSucceeded = "FetchMessagesSucceeded",
    SubmitMessageFailed = "SubmitMessageFailed",
    // TODO handle somehow (at least notify the user)
    SubmitMessageFailedTimeoutExceeded = "SubmitMessageFailedTimeoutExceeded",
    SubmitMessageRequested = "SubmitMessageRequested",
    SubmitMessageSucceeded = "SubmitMessageSucceeded",
    NetInfoChanged = "NetInfoChanged",
    SetPushNotificationsState = "SetPushNotificationsState",
    ChangePushNotificationTime = "ChangePushNotificationTime",
    ReadSettingsRequested = "ReadSettingsRequested",
    ReadSettingsSucceeded = "ReadSettingsSucceeded",
    ToggleDarkTheme = "ToggleDarkTheme",
}
