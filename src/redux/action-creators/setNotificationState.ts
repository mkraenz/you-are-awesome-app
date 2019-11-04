import { NOTIFICATION_HOUR, NOTIFICATION_MIN } from "../../config";
import { atTime } from "../../utils/atTime";
import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";

export const setNotificationsState = (
    enabled: boolean
): ISetNotificationsState => ({
    type: ReduxAction.SetNotificationsState,
    payload: {
        enabled,
        scheduledTime: atTime(NOTIFICATION_HOUR, NOTIFICATION_MIN),
    },
});
