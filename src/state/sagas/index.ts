import { fork } from "redux-saga/effects";
import fetchPostsSaga from "./fetchPostsSaga";
import changePushNotificationTimeSaga from "./push-notifications/changePushNotificationTimeSaga";
import readSettingsFromStorageSaga from "./push-notifications/readSettingsSaga";
import registerOrUnregisterPushNotificationsSaga from "./push-notifications/registerOrUnregisterPushNotificationsSaga";
import writePushNotificationSettingsToStorageSaga from "./push-notifications/writeSettingsSaga";
import sendPostSaga from "./sendPostSaga";

export default function* rootSaga() {
    yield fork(fetchPostsSaga);
    yield fork(sendPostSaga);
    yield fork(writePushNotificationSettingsToStorageSaga);
    yield fork(readSettingsFromStorageSaga);
    yield fork(changePushNotificationTimeSaga);
    yield fork(registerOrUnregisterPushNotificationsSaga);
}
