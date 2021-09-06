import { call, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { subscribeToPushNotifications } from "../../../api/subscribeToPushNotifications";
import { unsubscribeFromPushNotifications } from "../../../api/unsubscribeFromPushNotifications";
import { ActionType } from "../../actions/ActionType";
import {
    IChangePushNotificationTime,
    ISetPushNotificationsState,
} from "../../actions/IAppAction";

export default subscribeOrUnsubscribePushNotificationsSaga;

function* subscribeOrUnsubscribePushNotificationsSaga() {
    yield takeLatest(
        [
            ActionType.SetPushNotificationsState,
            ActionType.ChangePushNotificationTime,
        ],
        subscribeOrUnsubscribePushNotificationsWorkerSaga
    );
}

function* subscribeOrUnsubscribePushNotificationsWorkerSaga(
    action: ISetPushNotificationsState | IChangePushNotificationTime
) {
    // ensured internet connected on higher level
    if (
        action.type === ActionType.ChangePushNotificationTime ||
        action.payload.enabled
    ) {
        yield call(askNotificationPermissions);
        yield call(subscribeToPushNotifications, action.payload.scheduledTime);
    } else {
        yield call(unsubscribeFromPushNotifications);
    }
}
