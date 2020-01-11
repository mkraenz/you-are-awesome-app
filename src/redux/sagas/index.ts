import { fork } from "redux-saga/effects";
import changePushNotificationTimeSaga from "./changePushNotificationTimeSaga";
import fetchPostsSaga from "./fetchPostsSaga";
import readSettingsToStorageSaga from "./readSettingsSaga";
import registerOrUnregisterPushNotificationsSaga from "./registerOrUnregisterPushNotificationsSaga";
import sendPostSaga from "./sendPostSaga";
import writeSettingsToStorageSaga from "./writeSettingsSaga";

export default function* rootSaga() {
    yield fork(sendPostSaga);
    yield fork(fetchPostsSaga);
    yield fork(writeSettingsToStorageSaga);
    yield fork(registerOrUnregisterPushNotificationsSaga);
    yield fork(readSettingsToStorageSaga);
    yield fork(changePushNotificationTimeSaga);
}
