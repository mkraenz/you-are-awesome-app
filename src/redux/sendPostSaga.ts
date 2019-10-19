import { call, put, select, takeEvery } from "redux-saga/effects";
import { MAX_BACKOFF_IN_MS } from "../config";
import { IPostAdded, IPostSendFailed } from "./Actions";
import { SEND_POST_URI } from "./reducers/postReducer";
import { ReduxAction } from "./ReduxAction";
import { backoffInMs } from "./selectors";
import { waitAndSendPostToServer } from "./sendPostToServer";

const FINAL_ERROR_MSG = "Maximum timeout exceeded. Sending to server failed.";

function* sendPostWorkerSaga(action: IPostAdded | IPostSendFailed) {
    const postAdded =
        action.type === ReduxAction.PostAdded
            ? action
            : action.payload.originalAction;
    try {
        const backoff = yield select(backoffInMs);
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(FINAL_ERROR_MSG);
        }
        const responseData = yield call(
            waitAndSendPostToServer,
            postAdded.payload,
            SEND_POST_URI,
            backoff
        );
        console.log(JSON.stringify(responseData));

        yield put({
            type: ReduxAction.PostSendSucceeded,
            payload: responseData,
        });
    } catch (e) {
        yield* handleSendFailed(e, postAdded);
    }
}

function* handleSendFailed(e: any, postAdded: IPostAdded) {
    if (e.message === FINAL_ERROR_MSG) {
        const finalErrorAction = {
            type: ReduxAction.PostSendFailedTimeoutExceeded,
            payload: { originalAction: postAdded, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostSendFailed = {
            type: ReduxAction.PostSendFailed,
            payload: { originalAction: postAdded, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* sendPostSaga() {
    yield takeEvery(
        [ReduxAction.PostAdded, ReduxAction.PostSendFailed],
        sendPostWorkerSaga
    );
}

export default sendPostSaga;
