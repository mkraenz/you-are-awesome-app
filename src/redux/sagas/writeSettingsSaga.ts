import { AsyncStorage } from "react-native";
import { call, select, takeLatest } from "redux-saga/effects";
import { StorageSchema } from "../../config";
import {
    IChangePushNotificationTime,
    ISetNotificationsState,
} from "../Actions";
import { ReduxAction } from "../ReduxAction";
import { pushNotificationsEnabled } from "../selectors";

function* writeSettingsToStorageWorkerSaga(
    action: ISetNotificationsState | IChangePushNotificationTime
) {
    const notificationsEnabled: ReturnType<typeof pushNotificationsEnabled> = yield select(
        pushNotificationsEnabled
    );
    yield call(
        writeToAsyncStorage,
        notificationsEnabled,
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
        [
            ReduxAction.SetNotificationsState,
            ReduxAction.ChangePushNotificationTime,
        ],
        writeSettingsToStorageWorkerSaga
    );
}

export default writeSettingsToStorageSaga;
