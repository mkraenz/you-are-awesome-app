import { fork } from "redux-saga/effects";
import contributeSaga from "./contributeSaga";
import fetchMessagesSaga from "./fetchMessagesSaga";
import logAnalyticsSaga from "./logAnalyticsSaga";
import changePushNotificationTimeSaga from "./push-notifications/changePushNotificationTimeSaga";
import registerOrUnregisterPushNotificationsSaga from "./push-notifications/registerOrUnregisterPushNotificationsSaga";
import reportAsInappropriateSaga from "./reportAsInappropriateSaga";
import toggleAnalyticsSaga from "./toggleAnalyticsSaga";

export default function* rootSaga() {
    yield fork(fetchMessagesSaga);
    yield fork(contributeSaga);
    yield fork(changePushNotificationTimeSaga);
    yield fork(registerOrUnregisterPushNotificationsSaga);
    yield fork(toggleAnalyticsSaga);
    yield fork(reportAsInappropriateSaga);
    yield fork(logAnalyticsSaga);
}
