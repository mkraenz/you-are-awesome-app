import { fork } from "redux-saga/effects";
import fetchMessagesSaga from "./fetchMessagesSaga";
import changePushNotificationTimeSaga from "./push-notifications/changePushNotificationTimeSaga";
import registerOrUnregisterPushNotificationsSaga from "./push-notifications/registerOrUnregisterPushNotificationsSaga";
import setLanguageSaga from "./setLanguageSaga";
import submitMessageSaga from "./submitMessageSaga";

export default function* rootSaga() {
    yield fork(fetchMessagesSaga);
    yield fork(submitMessageSaga);
    yield fork(changePushNotificationTimeSaga);
    yield fork(registerOrUnregisterPushNotificationsSaga);
    yield fork(setLanguageSaga);
}
