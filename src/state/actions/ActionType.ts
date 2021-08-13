export enum ActionType {
    // TODO handle somehow (at least notify the user)
    FetchMessagesFailed = "FetchMessagesFailed",
    FetchMessagesFailedTimeoutExceeded = "FetchMessagesFailedTimeoutExceeded",
    FetchMessagesRequested = "FetchMessagesRequested",
    FetchMessagesSucceeded = "FetchMessagesSucceeded",
    // TODO handle somehow (at least notify the user)
    ContributionFailed = "ContributionFailed",
    ContributionRequested = "ContributionRequested",
    ContributionSucceeded = "ContributionSucceeded",
    DeleteMyContributions = "DeleteMyContributions",
    NetInfoChanged = "NetInfoChanged",
    SetPushNotificationsState = "SetPushNotificationsState",
    ChangePushNotificationTime = "ChangePushNotificationTime",
    ToggleDarkTheme = "ToggleDarkTheme",
    ToggleFirstOpen = "ToggleFirstOpen",
    ToggleAnalytics = "ToggleAnalytics",
    SetLanguage = "SetLanguage",
    AddToFavorites = "AddToFavorites",
    DeleteFavorites = "DeleteFavorites",
    ReportAsInappropriate = "ReportAsInappropriate",
}
