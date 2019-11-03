import { AsyncStorage } from "react-native";
import { call, takeLatest } from "redux-saga/effects";
import { StorageSchema } from "../../config";
import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";

function* writeSettingsToStorageWorkerSaga(action: ISetNotificationsState) {
    yield call(
        writeToAsyncStorage,
        action.payload.enabled,
        action.payload.scheduledTime
    );
}

async function writeToAsyncStorage(
    notificationsEnabled: boolean,
    scheduledTime: Date
) {
    // verbose name because async storage is like a production database.
    // so trying to avoid trouble as early as possible.
    try {
        await AsyncStorage.multiSet([
            [
                StorageSchema.LocalNotificationsEnabled,
                String(notificationsEnabled),
            ],
            [
                StorageSchema.LocalNotificationsScheduledTime,
                scheduledTime.toISOString(),
            ],
        ]);
    } catch (error) {
        throw error;
    }
}

function* writeSettingsToStorageSaga() {
    yield takeLatest(
        [ReduxAction.SetNotificationsState],
        writeSettingsToStorageWorkerSaga
    );
}

export default writeSettingsToStorageSaga;
