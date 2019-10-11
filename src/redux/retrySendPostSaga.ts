import { call, put, takeEvery } from "redux-saga/effects";
import { IAddPost, IPostSendFailed } from "./Actions";
import { SERVER_URI } from "./reducers/postReducer";
import { ReduxAction } from "./ReduxAction";
import { sendAddedPostToServer } from "./sendAddedPostToServer";

function* sendPostWorkerSaga(action: IAddPost | IPostSendFailed) {
    const postAdded =
        action.type === ReduxAction.PostAdded
            ? action
            : action.payload.originalAction;
    try {
        const responseData = yield call(
            sendAddedPostToServer,
            postAdded.payload,
            SERVER_URI
        );
        yield put({
            type: ReduxAction.PostSendSucceeded,
            payload: responseData,
        });
    } catch (e) {
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
