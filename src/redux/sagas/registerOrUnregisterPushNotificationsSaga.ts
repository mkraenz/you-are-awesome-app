import { call, select, takeLatest } from "redux-saga/effects";
import { registerForPushNotifications } from "../../api/registerForPushNotifications";
import { unregisterFromPushNotifications } from "../../api/unregisterFromPushNotifications";
import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";
import { connectedToInternet } from "../selectors";

export default registerOrUnregisterPushNotificationsSaga;

function* registerOrUnregisterPushNotificationsSaga() {
    yield takeLatest(
        [ReduxAction.SetNotificationsState],
        registerOrUnregisterPushNotificationsWorkerSaga
    );
}

function* registerOrUnregisterPushNotificationsWorkerSaga(
    action: ISetNotificationsState
) {
    const connectedToInternet_: ReturnType<typeof connectedToInternet> = yield select(
        connectedToInternet
    );
    // TODO #91 write issue for this. should be handled or we end up with lots of duplicate cron jobs. One way might be to do this in the register lambda function
    if (!connectedToInternet_) {
        throw new Error(
            `No internet connection. Failed to ${
                action.payload.enabled ? "" : "un"
            }subscribe ${
                action.payload.enabled ? "to" : "from"
            } push notifications.`
        );
    }
    if (action.payload.enabled) {
        yield call(registerForPushNotifications, action.payload.scheduledTime);
    } else {
        yield call(unregisterFromPushNotifications);
    }
}
