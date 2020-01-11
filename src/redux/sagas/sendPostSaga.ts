import { call, put, select, takeEvery } from "redux-saga/effects";
import { waitAndSendPostToServer } from "../../api/sendPostToServer";
import { MAX_BACKOFF_IN_MS, URI } from "../../config";
import { AwaitedReturnType } from "../../typescript/AwaitedReturnType";
import {
    IPostSendFailed,
    IPostSendFailedTimeoutExceeded,
    IPostSendRequested,
    IPostSendSucceeded,
} from "../Actions";
import { IPostContent } from "../IPost";
import { ReduxAction } from "../ReduxAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED = "Maximum timeout exceeded. Sending to server failed.";

function* sendPostWorkerSaga(action: IPostSendRequested | IPostSendFailed) {
    const postSendRequested =
        action.type === ReduxAction.PostSendRequested
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
            type: ReduxAction.PostSendSucceeded,
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
            type: ReduxAction.PostSendFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostSendFailed = {
            type: ReduxAction.PostSendFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* sendPostSaga() {
    yield takeEvery(
        [ReduxAction.PostSendRequested, ReduxAction.PostSendFailed],
        sendPostWorkerSaga
    );
}

export default sendPostSaga;
