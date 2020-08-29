import { call, put, select, takeEvery } from "redux-saga/effects";
import { waitAndSubmitMessageToServer } from "../../api/waitAndSubmitMessageToServer";
import { MAX_BACKOFF_IN_MS, URI } from "../../config";
import { pick } from "../../utils/pick";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    ISubmitMessageFailed,
    ISubmitMessageFailedTimeoutExceeded,
    ISubmitMessageRequested,
    ISubmitMessageSucceeded,
} from "../actions/SubmitMessageAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED = "Maximum timeout exceeded. Sending to server failed.";

function* submitMessageWorkerSaga(
    action: ISubmitMessageRequested | ISubmitMessageFailed
) {
    const submitMessageRequested =
        action.type === ActionType.SubmitMessageRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff: ReturnType<typeof backoffInMs> = yield select(
            backoffInMs
        );
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(TIMEOUT_EXCEEDED);
        }
        const responseData: AwaitedReturnType<typeof waitAndSubmitMessageToServer> = yield call(
            waitAndSubmitMessageToServer,
            submitMessageRequested.payload,
            URI.SEND_MESSAGES,
            backoff
        );
        const success: ISubmitMessageSucceeded = {
            type: ActionType.SubmitMessageSucceeded,
            payload: pick(responseData, ["id"]),
        };
        yield put(success);
    } catch (e) {
        yield* handleSendFailed(e, submitMessageRequested);
    }
}

function* handleSendFailed(e: Error, action: ISubmitMessageRequested) {
    if (e.message === TIMEOUT_EXCEEDED) {
        const finalErrorAction: ISubmitMessageFailedTimeoutExceeded = {
            type: ActionType.SubmitMessageFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: ISubmitMessageFailed = {
            type: ActionType.SubmitMessageFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* submitMessageSaga() {
    yield takeEvery(
        [ActionType.SubmitMessageRequested, ActionType.SubmitMessageFailed],
        submitMessageWorkerSaga
    );
}

export default submitMessageSaga;
