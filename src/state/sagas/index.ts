import { fork } from "redux-saga/effects";
import contributeSaga from "./contributeSaga";
import fetchMessagesSaga from "./fetchMessagesSaga";
import logAnalyticsSaga from "./logAnalyticsSaga";
import reportAsInappropriateSaga from "./reportAsInappropriateSaga";
import subscribeOrUnsubscribePushNotificationsSaga from "./subscribeOrUnsubscribePushNotificationsSaga";
import toggleAnalyticsSaga from "./toggleAnalyticsSaga";

export default function* rootSaga() {
    yield fork(fetchMessagesSaga);
    yield fork(contributeSaga);
    yield fork(subscribeOrUnsubscribePushNotificationsSaga);
    yield fork(toggleAnalyticsSaga);
    yield fork(reportAsInappropriateSaga);
    yield fork(logAnalyticsSaga);
}
