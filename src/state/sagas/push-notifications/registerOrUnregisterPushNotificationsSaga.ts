import { call, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { registerForPushNotifications } from "../../../api/registerForPushNotifications";
import { subscribeToPushNotifications } from "../../../api/subscribeToPushNotifications";
import { unregisterFromPushNotifications } from "../../../api/unregisterFromPushNotifications";
import { unsubscribeFromPushNotifications } from "../../../api/unsubscribeFromPushNotifications";
import { CONFIG } from "../../../config";
import { ActionType } from "../../actions/ActionType";
import { ISetPushNotificationsState } from "../../actions/IAppAction";

export default registerOrUnregisterPushNotificationsSaga;

function* registerOrUnregisterPushNotificationsSaga() {
    yield takeLatest(
        [ActionType.SetPushNotificationsState],
        registerOrUnregisterPushNotificationsWorkerSaga
    );
}

function* registerOrUnregisterPushNotificationsWorkerSaga(
    action: ISetPushNotificationsState
) {
    // ensured internet connected on higher level
    if (action.payload.enabled) {
        yield call(askNotificationPermissions);
        if (CONFIG.featureFlags.useAwsForPushNotifications) {
            yield call(
                subscribeToPushNotifications,
                action.payload.scheduledTime
            );
        } else {
            yield call(
                registerForPushNotifications,
                action.payload.scheduledTime
            );
        }
    } else {
        if (CONFIG.featureFlags.useAwsForPushNotifications) {
            yield call(unsubscribeFromPushNotifications);
        } else {
            yield call(unregisterFromPushNotifications);
        }
    }
}
