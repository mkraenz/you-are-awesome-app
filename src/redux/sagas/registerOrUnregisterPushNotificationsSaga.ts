import { call, takeLatest } from "redux-saga/effects";
import { registerForPushNotifications } from "../../api/registerForPushNotifications";
import { unregisterFromPushNotifications } from "../../api/unregisterFromPushNotifications";
import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";

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
    // ensured internet connected on higher level
    if (action.payload.enabled) {
        yield call(registerForPushNotifications, action.payload.scheduledTime);
    } else {
        yield call(unregisterFromPushNotifications);
    }
}
