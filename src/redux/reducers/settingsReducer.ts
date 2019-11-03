import { IReadSettingsSucceeded, ISetNotificationsState } from "../Actions";
import { IReduxStateSettings } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

export const settingsReducer = (
    state: IReduxStateSettings = {
        notificationsEnabled: false,
        scheduledTime: null,
    },
    action: ISetNotificationsState | IReadSettingsSucceeded
): IReduxStateSettings => {
    switch (action.type) {
        case ReduxAction.SetNotificationsState:
        case ReduxAction.ReadSettingsSucceeded:
            return {
                ...state,
                notificationsEnabled: action.payload.enabled,
                scheduledTime: action.payload.scheduledTime,
            };
    }
    return state;
};
