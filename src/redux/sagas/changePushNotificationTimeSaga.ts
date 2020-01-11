import { call, takeLatest } from "redux-saga/effects";
import { registerForPushNotifications } from "../../api/registerForPushNotifications";
import { unregisterFromPushNotifications } from "../../api/unregisterFromPushNotifications";
import { IChangePushNotificationTime } from "../Actions";
import { ReduxAction } from "../ReduxAction";

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
    // ensured notifications enabled and internet connected on higher level
    yield call(unregisterFromPushNotifications);
    yield call(registerForPushNotifications, action.payload.scheduledTime);
}
