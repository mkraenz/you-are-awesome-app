import { fork } from "redux-saga/effects";
import fetchPostsSaga from "./fetchPostsSaga";
import maybeScheduleNotificationsSaga from "./maybeScheduleNotificationsSaga";
import readSettingsToStorageSaga from "./readSettingsSaga";
import sendPostSaga from "./sendPostSaga";
import writeSettingsToStorageSaga from "./writeSettingsSaga";

export default function* rootSaga() {
    yield fork(sendPostSaga);
    yield fork(fetchPostsSaga);
    yield fork(writeSettingsToStorageSaga);
    yield fork(maybeScheduleNotificationsSaga);
    yield fork(readSettingsToStorageSaga);
}
