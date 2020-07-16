import { ActionType } from "../actions/ActionType";
import { IChangePushNotificationTime } from "../actions/IAppAction";

export const changePushNotificationTime = (
    scheduledTime: Date
): IChangePushNotificationTime => ({
    type: ActionType.ChangePushNotificationTime,
    payload: {
        scheduledTime,
    },
});
