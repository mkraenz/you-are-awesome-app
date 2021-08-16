import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { IAppAction } from "../actions/IAppAction";
import { IAppState } from "../state/IAppState";

export const appReducer: Reducer<IAppState, IAppAction> = (
    state = {
        isDarkModeOn: false,
        analyticsEnabled: true,
        pushNotificationsEnabled: false,
        pushNotificationsScheduledTime: new Date(0),
        language: null,
        onboardingCompleted: false,
    },
    action
) => {
    switch (action.type) {
        case ActionType.ToggleDarkTheme:
            return {
                ...state,
                isDarkModeOn: !state.isDarkModeOn,
            };
        case ActionType.ToggleAnalytics:
            return {
                ...state,
                analyticsEnabled: !state.analyticsEnabled,
            };
        case ActionType.ToggleOnboardingCompleted:
            return {
                ...state,
                onboardingCompleted: !state.onboardingCompleted,
            };
        case ActionType.SetPushNotificationsState:
            return {
                ...state,
                pushNotificationsEnabled: action.payload.enabled,
                pushNotificationsScheduledTime: action.payload.scheduledTime,
            };
        case ActionType.ChangePushNotificationTime:
            return {
                ...state,
                pushNotificationsScheduledTime: action.payload.scheduledTime,
            };
        case ActionType.SetLanguage:
            return {
                ...state,
                language: action.payload.language,
            };
        case ActionType.ReportAsInappropriate: // no state change, only triggers saga
        default:
            return state;
    }
};
