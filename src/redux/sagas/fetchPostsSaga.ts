import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchPosts } from "../../api/fetchPosts";
import { MAX_BACKOFF_IN_MS } from "../../config";
import {
    IPostFetchFailed,
    IPostFetchFailedTimeoutExceeded,
    IPostFetchRequested,
    IPostFetchSucceeded,
} from "../Actions";
import { PostWithDate } from "../IPost";
import { GET_POSTS_URI } from "../reducers/postReducer";
import { ReduxAction } from "../ReduxAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED =
    "Maximum timeout exceeded. Fetching posts from server failed.";

function* fetchPostsWorkerSaga(action: IPostFetchRequested | IPostFetchFailed) {
    const fetchPostRequested =
        action.type === ReduxAction.PostFetchRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff = yield select(backoffInMs);
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(TIMEOUT_EXCEEDED);
        }
        const responseData: PostWithDate = yield call(
            fetchPosts,
            GET_POSTS_URI
        );
        const success: IPostFetchSucceeded = {
            type: ReduxAction.PostFetchSucceeded,
            payload: responseData,
        };
        yield put(success);
    } catch (e) {
        yield* handleFetchFailed(e, fetchPostRequested);
    }
}

function* handleFetchFailed(e: Error, action: IPostFetchRequested) {
    if (e.message === TIMEOUT_EXCEEDED) {
        const finalErrorAction: IPostFetchFailedTimeoutExceeded = {
            type: ReduxAction.PostFetchFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostFetchFailed = {
            type: ReduxAction.PostFetchFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* fetchPostsSaga() {
    yield takeLatest(
        [ReduxAction.PostFetchRequested, ReduxAction.PostFetchFailed],
        fetchPostsWorkerSaga
    );
}

export default fetchPostsSaga;
