import { call, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { subscribeToPushNotifications } from "../../../api/subscribeToPushNotifications";
import { unsubscribeFromPushNotifications } from "../../../api/unsubscribeFromPushNotifications";
import { ActionType } from "../../actions/ActionType";
import { ISetPushNotificationsState } from "../../actions/IAppAction";

export default registerOrUnregisterPushNotificationsSaga;

function* registerOrUnregisterPushNotificationsSaga() {
    yield takeLatest(
        [ActionType.SetPushNotificationsState],
        registerOrUnregisterPushNotificationsWorkerSaga
    );
}

// TODO #535 rename to subscribe
function* registerOrUnregisterPushNotificationsWorkerSaga(
    action: ISetPushNotificationsState
) {
    // ensured internet connected on higher level
    if (action.payload.enabled) {
        yield call(askNotificationPermissions);
        yield call(subscribeToPushNotifications, action.payload.scheduledTime);
    } else {
        yield call(unsubscribeFromPushNotifications);
    }
}
