export enum ActionType {
    // TODO handle somehow (at least notify the user)
    FetchMessagesFailed = "FetchMessagesFailed",
    FetchMessagesFailedTimeoutExceeded = "FetchMessagesFailedTimeoutExceeded",
    FetchMessagesRequested = "FetchMessagesRequested",
    FetchMessagesSucceeded = "FetchMessagesSucceeded",
    // TODO handle somehow (at least notify the user)
    SubmitMessageFailed = "SubmitMessageFailed",
    SubmitMessageFailedTimeoutExceeded = "SubmitMessageFailedTimeoutExceeded",
    SubmitMessageRequested = "SubmitMessageRequested",
    SubmitMessageSucceeded = "SubmitMessageSucceeded",
    DeleteMyContributions = "DeleteMyContributions",
    NetInfoChanged = "NetInfoChanged",
    SetPushNotificationsState = "SetPushNotificationsState",
    ChangePushNotificationTime = "ChangePushNotificationTime",
    ToggleDarkTheme = "ToggleDarkTheme",
    SetLanguage = "SetLanguage",
    AddToFavorites = "AddToFavorites",
    DeleteFavorites = "DeleteFavorites",
}
