import { call, put, select, takeEvery } from "redux-saga/effects";
import { waitAndSendPostToServer } from "../../api/sendPostToServer";
import { MAX_BACKOFF_IN_MS, URI } from "../../config";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    IPostSendFailed,
    IPostSendFailedTimeoutExceeded,
    IPostSendRequested,
    IPostSendSucceeded,
} from "../actions/IAction";
import { backoffInMs } from "../selectors";
import { IPostContent } from "../state/IPost";

const TIMEOUT_EXCEEDED = "Maximum timeout exceeded. Sending to server failed.";

function* sendPostWorkerSaga(action: IPostSendRequested | IPostSendFailed) {
    const postSendRequested =
        action.type === ActionType.PostSendRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff: ReturnType<typeof backoffInMs> = yield select(
            backoffInMs
        );
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(TIMEOUT_EXCEEDED);
        }
        const responseData: AwaitedReturnType<typeof waitAndSendPostToServer> = yield call(
            waitAndSendPostToServer,
            pickPostContent(postSendRequested.payload),
            URI.SEND_POST,
            backoff
        );
        const success: IPostSendSucceeded = {
            type: ActionType.PostSendSucceeded,
            payload: responseData,
        };
        yield put(success);
    } catch (e) {
        yield* handleSendFailed(e, postSendRequested);
    }
}

const pickPostContent = (post: IPostContent): IPostContent => ({
    author: post.author,
    country: post.country,
    text: post.text,
});

function* handleSendFailed(e: Error, action: IPostSendRequested) {
    if (e.message === TIMEOUT_EXCEEDED) {
        const finalErrorAction: IPostSendFailedTimeoutExceeded = {
            type: ActionType.PostSendFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostSendFailed = {
            type: ActionType.PostSendFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* sendPostSaga() {
    yield takeEvery(
        [ActionType.PostSendRequested, ActionType.PostSendFailed],
        sendPostWorkerSaga
    );
}

export default sendPostSaga;
