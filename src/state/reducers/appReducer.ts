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
        default:
            return state;
    }
};
