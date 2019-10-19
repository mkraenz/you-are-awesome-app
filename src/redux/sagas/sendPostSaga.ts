import { call, put, select, takeEvery } from "redux-saga/effects";
import { waitAndSendPostToServer } from "../../api/sendPostToServer";
import { MAX_BACKOFF_IN_MS } from "../../config";
import { IPostSendFailed, IPostSendRequested } from "../Actions";
import { SEND_POST_URI } from "../reducers/postReducer";
import { ReduxAction } from "../ReduxAction";
import { backoffInMs } from "../selectors";

const FINAL_ERROR_MSG = "Maximum timeout exceeded. Sending to server failed.";

function* sendPostWorkerSaga(action: IPostSendRequested | IPostSendFailed) {
    const postSendRequested =
        action.type === ReduxAction.PostSendRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff = yield select(backoffInMs);
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(FINAL_ERROR_MSG);
        }
        const responseData = yield call(
            waitAndSendPostToServer,
            postSendRequested.payload,
            SEND_POST_URI,
            backoff
        );
        yield put({
            type: ReduxAction.PostSendSucceeded,
            payload: responseData,
        });
    } catch (e) {
        yield* handleSendFailed(e, postSendRequested);
    }
}

function* handleSendFailed(e: any, action: IPostSendRequested) {
    if (e.message === FINAL_ERROR_MSG) {
        const finalErrorAction = {
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
