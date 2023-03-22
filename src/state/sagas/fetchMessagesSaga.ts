import { call, put, takeLatest } from "redux-saga/effects";
import { fetchMessages } from "../../api/fetchMessages";
import { CONFIG } from "../../config";
import { todaysMessageOrRandomMessage } from "../../utils/todayOrRandomMessage";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import {
    fetchMessagesFailed,
    fetchMessagesRequested,
    fetchMessagesSucceeded,
} from "../reducers/messageReducer";

function* fetchMessagesWorkerSaga(
    action:
        | ReturnType<typeof fetchMessagesRequested>
        | ReturnType<typeof fetchMessagesFailed>
) {
    const isFetchMessagesRequested =
        action.type === fetchMessagesRequested.type
            ? action
            : action.payload.originalAction;
    try {
        const messages: AwaitedReturnType<typeof fetchMessages> = yield call(
            fetchMessages,
            CONFIG.uri.fetchMessages
        );
        const maybeTodaysMsg = todaysMessageOrRandomMessage(messages);
        yield put(
            fetchMessagesSucceeded({
                message: maybeTodaysMsg,
                now: new Date(),
                messages,
            })
        );
    } catch (e: any) {
        yield* handleFetchFailed(e, isFetchMessagesRequested);
    }
}

function* handleFetchFailed(
    e: Error,
    action: ReturnType<typeof fetchMessagesRequested>
) {
    yield put(fetchMessagesFailed({ originalAction: action, error: e }));
}

function* fetchMessagesSaga() {
    yield takeLatest([fetchMessagesRequested.type], fetchMessagesWorkerSaga);
}

export default fetchMessagesSaga;
