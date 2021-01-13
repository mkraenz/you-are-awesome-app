import { call, select, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { registerForPushNotifications } from "../../../api/registerForPushNotifications";
import { unregisterFromPushNotifications } from "../../../api/unregisterFromPushNotifications";
import { assert } from "../../../utils/assert";
import { ActionType } from "../../actions/ActionType";
import { IChangePushNotificationTime } from "../../actions/IAppAction";
import { internetConnected } from "../../selectors";

export default changePushNotificationTimeSaga;

function* changePushNotificationTimeSaga() {
    yield takeLatest(
        [ActionType.ChangePushNotificationTime],
        changePushNotificationTimeWorkerSaga
    );
}

function* changePushNotificationTimeWorkerSaga(
    action: IChangePushNotificationTime
) {
    // internet connected on higher level
    const connected: ReturnType<typeof internetConnected> = yield select(
        internetConnected
    );
    assert(connected, "no internet connection");

    yield call(askNotificationPermissions);
    yield call(unregisterFromPushNotifications);
    yield call(registerForPushNotifications, action.payload.scheduledTime);
}
