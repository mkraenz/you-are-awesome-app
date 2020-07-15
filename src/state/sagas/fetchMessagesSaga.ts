import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchMessages } from "../../api/fetchPosts";
import { MAX_BACKOFF_IN_MS, URI } from "../../config";
import { todaysMessageOrRandomMessage } from "../../utils/todayOrRandomPost";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    IFetchMessagesFailed,
    IFetchMessagesFailedTimeoutExceeded,
    IFetchMessagesRequested,
    IFetchMessagesSucceeded,
} from "../actions/IAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED =
    "Maximum timeout exceeded. Fetching messages from server failed.";

function* fetchMessagesWorkerSaga(
    action: IFetchMessagesRequested | IFetchMessagesFailed
) {
    const fetchMessagesRequested =
        action.type === ActionType.FetchMessagesRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff: ReturnType<typeof backoffInMs> = yield select(
            backoffInMs
        );
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(TIMEOUT_EXCEEDED);
        }
        const messages: AwaitedReturnType<typeof fetchMessages> = yield call(
            fetchMessages,
            URI.FETCH_MESSAGES
        );
        const maybeTodaysMsg = todaysMessageOrRandomMessage(messages);
        const success: IFetchMessagesSucceeded = {
            type: ActionType.FetchMessagesSucceeded,
            payload: {
                message: maybeTodaysMsg,
                now: new Date(),
                messages,
            },
        };
        yield put(success);
    } catch (e) {
        yield* handleFetchFailed(e, fetchMessagesRequested);
    }
}

function* handleFetchFailed(e: Error, action: IFetchMessagesRequested) {
    if (e.message === TIMEOUT_EXCEEDED) {
        const finalErrorAction: IFetchMessagesFailedTimeoutExceeded = {
            type: ActionType.FetchMessagesFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IFetchMessagesFailed = {
            type: ActionType.FetchMessagesFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* fetchMessagesSaga() {
    yield takeLatest(
        [ActionType.FetchMessagesRequested, ActionType.FetchMessagesFailed],
        fetchMessagesWorkerSaga
    );
}

export default fetchMessagesSaga;
