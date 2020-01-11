import { call, select, takeLatest } from "redux-saga/effects";
import { registerForPushNotifications } from "../../api/registerForPushNotifications";
import { unregisterFromPushNotifications } from "../../api/unregisterFromPushNotifications";
import { IChangePushNotificationTime } from "../Actions";
import { ReduxAction } from "../ReduxAction";
import { connectedToInternet, pushNotificationsEnabled } from "../selectors";

export default changePushNotificationTimeSaga;

function* changePushNotificationTimeSaga() {
    yield takeLatest(
        [ReduxAction.ChangePushNotificationTime],
        changePushNotificationTimeWorkerSaga
    );
}

function* changePushNotificationTimeWorkerSaga(
    action: IChangePushNotificationTime
) {
    const enabled: ReturnType<typeof connectedToInternet> = yield select(
        pushNotificationsEnabled
    );
    if (!enabled) {
        return; // do nothing
    }
    const connectedToInternet_: ReturnType<typeof connectedToInternet> = yield select(
        connectedToInternet
    );
    // TODO #91 write issue for this? Maybe even ignore
    if (!connectedToInternet_) {
        throw new Error(
            "No internet connection. Failed to change scheduled time of push notifications."
        );
    }
    yield call(unregisterFromPushNotifications);
    yield call(registerForPushNotifications, action.payload.scheduledTime);
}
