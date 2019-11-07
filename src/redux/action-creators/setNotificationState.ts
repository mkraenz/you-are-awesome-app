import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";

export const setNotificationsState = (
    enabled: boolean,
    scheduledTime: Date
): ISetNotificationsState => ({
    type: ReduxAction.SetNotificationsState,
    payload: {
        enabled,
        scheduledTime,
    },
});
