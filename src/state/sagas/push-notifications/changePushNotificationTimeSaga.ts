import { call, select, takeLatest } from "redux-saga/effects";
import { askNotificationPermissions } from "../../../api/native-api/askNotificationPermissions";
import { subscribeToPushNotifications } from "../../../api/subscribeToPushNotifications";
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

// TODO #535 rename to subscribe. Is this saga still necessary with PUT request?
function* changePushNotificationTimeWorkerSaga(
    action: IChangePushNotificationTime
) {
    // internet connected on higher level
    const connected: ReturnType<typeof internetConnected> = yield select(
        internetConnected
    );
    assert(connected, "no internet connection");

    yield call(askNotificationPermissions);
    yield call(subscribeToPushNotifications, action.payload.scheduledTime);
}
