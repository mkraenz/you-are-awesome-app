import AsyncStorage from "@react-native-community/async-storage";
import { call, select, takeLatest } from "redux-saga/effects";
import { StorageSchema } from "../../../config";
import { ActionType } from "../../actions/ActionType";
import {
    IChangePushNotificationTime,
    ISetPushNotificationsState,
} from "../../actions/IAppAction";
import { pushNotificationsEnabled } from "../../selectors";

function* writeSettingsToStorageWorkerSaga(
    action: ISetPushNotificationsState | IChangePushNotificationTime
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
    try {
        await AsyncStorage.multiSet([
            [
                StorageSchema.PushNotificationsEnabled,
                String(notificationsEnabled),
            ],
            [
                StorageSchema.PushNotificationsScheduledTime,
                scheduledTime.toISOString(),
            ],
        ]);
    } catch (error) {
        throw error;
    }
}

function* writePushNotificationsSettingsToStorageSaga() {
    yield takeLatest(
        [
            ActionType.SetPushNotificationsState,
            ActionType.ChangePushNotificationTime,
        ],
        writeSettingsToStorageWorkerSaga
    );
}

export default writePushNotificationsSettingsToStorageSaga;
