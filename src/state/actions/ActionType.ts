export enum ActionType {
    // TODO handle somehow (at least notify the user)
    ContributionFailed = "ContributionFailed",
    ContributionRequested = "ContributionRequested",
    ContributionSucceeded = "ContributionSucceeded",
    DeleteMyContributions = "DeleteMyContributions",
    NetInfoChanged = "NetInfoChanged",
    SetPushNotificationsState = "SetPushNotificationsState",
    ChangePushNotificationTime = "ChangePushNotificationTime",
    ToggleDarkTheme = "ToggleDarkTheme",
    ToggleOnboardingCompleted = "ToggleOnboardingCompleted",
    ToggleAnalytics = "ToggleAnalytics",
    SetLanguage = "SetLanguage",
    AddToFavorites = "AddToFavorites",
    DeleteFavorites = "DeleteFavorites",
    ReportAsInappropriate = "ReportAsInappropriate",
}
