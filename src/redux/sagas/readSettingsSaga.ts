import { AsyncStorage } from "react-native";
import { call, put, takeLatest } from "redux-saga/effects";
import { StorageSchema } from "../../config";
import { AwaitedReturnType } from "../../typescript/AwaitedReturnType";
import { IReadSettingsSucceeded } from "../Actions";
import { ReduxAction } from "../ReduxAction";
import { deserialize } from "./deserializeSettings";

type Settings = {
    enabled: boolean;
    scheduledTime: Date | null;
};

function* readSettingsWorkerSaga() {
    const settings: AwaitedReturnType<typeof readFromAsyncStorage> = yield call(
        readFromAsyncStorage
    );
    const success: IReadSettingsSucceeded = {
        type: ReduxAction.ReadSettingsSucceeded,
        payload: settings,
    };
    yield put(success);
}

async function readFromAsyncStorage(): Promise<Settings> {
    // verbose name because async storage is like a production database.
    // so trying to avoid trouble as early as possible.
    try {
        const serializedSettings = (await AsyncStorage.multiGet([
            StorageSchema.LocalNotificationsEnabled,
            StorageSchema.LocalNotificationsScheduledTime,
        ])) as [StorageSchema, string][];
        const settings = deserialize(serializedSettings);
        return settings;
    } catch (error) {
        throw error;
    }
}

function* readSettingsToStorageSaga() {
    yield takeLatest(
        [ReduxAction.ReadSettingsRequested],
        readSettingsWorkerSaga
    );
}

export default readSettingsToStorageSaga;
