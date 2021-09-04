import { call, select, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { registerForPushNotifications } from "../../../api/registerForPushNotifications";
import { subscribeToPushNotifications } from "../../../api/subscribeToPushNotifications";
import { unregisterFromPushNotifications } from "../../../api/unregisterFromPushNotifications";
import { CONFIG } from "../../../config";
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
    if (CONFIG.featureFlags.useAwsForPushNotifications) {
        yield call(subscribeToPushNotifications, action.payload.scheduledTime);
    } else {
        yield call(unregisterFromPushNotifications);
        yield call(registerForPushNotifications, action.payload.scheduledTime);
    }
}
