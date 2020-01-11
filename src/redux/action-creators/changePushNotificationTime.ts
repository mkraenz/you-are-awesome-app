import { IChangePushNotificationTime } from "../Actions";
import { ReduxAction } from "../ReduxAction";

export const changePushNotificationTime = (
    scheduledTime: Date
): IChangePushNotificationTime => ({
    type: ReduxAction.ChangePushNotificationTime,
    payload: {
        scheduledTime,
    },
});
