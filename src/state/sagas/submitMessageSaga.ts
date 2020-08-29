import { call, put, takeEvery } from "redux-saga/effects";
import { waitAndSubmitMessageToServer } from "../../api/waitAndSubmitMessageToServer";
import { URI } from "../../config";
import { pick } from "../../utils/pick";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    ISubmitMessageFailed,
    ISubmitMessageFailedTimeoutExceeded,
    ISubmitMessageRequested,
    ISubmitMessageSucceeded,
} from "../actions/SubmitMessageAction";

const TIMEOUT_EXCEEDED = "Maximum timeout exceeded. Sending to server failed.";

function* submitMessageWorkerSaga(
    action: ISubmitMessageRequested | ISubmitMessageFailed
) {
    const submitMessageRequested =
        action.type === ActionType.SubmitMessageRequested
            ? action
            : action.payload.originalAction;
    try {
        const responseData: AwaitedReturnType<typeof waitAndSubmitMessageToServer> = yield call(
            waitAndSubmitMessageToServer,
            submitMessageRequested.payload,
            URI.SEND_MESSAGES
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
