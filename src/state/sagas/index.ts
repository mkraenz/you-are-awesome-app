import { fork } from "redux-saga/effects";
import fetchMessagesSaga from "./fetchMessagesSaga";
import changePushNotificationTimeSaga from "./push-notifications/changePushNotificationTimeSaga";
import registerOrUnregisterPushNotificationsSaga from "./push-notifications/registerOrUnregisterPushNotificationsSaga";
import reportAsInappropriateSaga from "./reportAsInappropriateSaga";
import setLanguageSaga from "./setLanguageSaga";
import submitMessageSaga from "./submitMessageSaga";
import toggleAnalyticsSaga from "./toggleAnalyticsSaga";

export default function* rootSaga() {
    yield fork(fetchMessagesSaga);
    yield fork(submitMessageSaga);
    yield fork(changePushNotificationTimeSaga);
    yield fork(registerOrUnregisterPushNotificationsSaga);
    yield fork(setLanguageSaga);
    yield fork(toggleAnalyticsSaga);
    yield fork(reportAsInappropriateSaga);
}
