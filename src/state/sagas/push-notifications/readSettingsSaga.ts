import AsyncStorage from "@react-native-community/async-storage";
import { call, put, takeLatest } from "redux-saga/effects";
import { StorageSchema } from "../../../config";
import { AwaitedReturnType } from "../../../utils/ts/AwaitedReturnType";
import { Unpack } from "../../../utils/ts/Unpack";
import { ActionType } from "../../actions/ActionType";
import { IReadSettingsSucceeded } from "../../actions/IAppAction";
import { deserialize } from "./deserializeSettings";

function* readSettingsWorkerSaga() {
    const settings: AwaitedReturnType<typeof readFromAsyncStorage> = yield call(
        readFromAsyncStorage
    );
    const success: IReadSettingsSucceeded = {
        type: ActionType.ReadSettingsSucceeded,
        payload: settings,
    };
    yield put(success);
}

async function readFromAsyncStorage(): Promise<
    IReadSettingsSucceeded["payload"]
> {
    const serializedSettings = (await AsyncStorage.multiGet([
        StorageSchema.PushNotificationsEnabled,
        StorageSchema.PushNotificationsScheduledTime,
    ])) as [StorageSchema, string | null][];
    const serializedSettingsObj: Unpack<Parameters<typeof deserialize>> = {
        [StorageSchema.PushNotificationsEnabled]: serializedSettings[0][1],
        [StorageSchema.PushNotificationsScheduledTime]:
            serializedSettings[1][1],
    };
    return deserialize(serializedSettingsObj);
}

function* readSettingsFromStorageSaga() {
    yield takeLatest(
        [ActionType.ReadSettingsRequested],
        readSettingsWorkerSaga
    );
}

export default readSettingsFromStorageSaga;
