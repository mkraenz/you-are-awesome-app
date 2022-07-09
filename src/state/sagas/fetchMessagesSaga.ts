import { call, put, takeLatest } from "redux-saga/effects";
import { fetchMessages } from "../../api/fetchMessages";
import { CONFIG } from "../../config";
import { todaysMessageOrRandomMessage } from "../../utils/todayOrRandomMessage";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    IFetchMessagesFailed,
    IFetchMessagesRequested,
    IFetchMessagesSucceeded,
} from "../actions/IAction";

function* fetchMessagesWorkerSaga(
    action: IFetchMessagesRequested | IFetchMessagesFailed
) {
    const fetchMessagesRequested =
        action.type === ActionType.FetchMessagesRequested
            ? action
            : action.payload.originalAction;
    try {
        const messages: AwaitedReturnType<typeof fetchMessages> = yield call(
            fetchMessages,
            CONFIG.uri.fetchMessages
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
    } catch (e: any) {
        yield* handleFetchFailed(e, fetchMessagesRequested);
    }
}

function* handleFetchFailed(e: Error, action: IFetchMessagesRequested) {
    const errorAction: IFetchMessagesFailed = {
        type: ActionType.FetchMessagesFailed,
        payload: { originalAction: action, error: e },
        error: true,
    };
    yield put(errorAction);
}

function* fetchMessagesSaga() {
    yield takeLatest(
        [ActionType.FetchMessagesRequested],
        fetchMessagesWorkerSaga
    );
}

export default fetchMessagesSaga;
