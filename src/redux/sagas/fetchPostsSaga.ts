import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchPosts } from "../../api/fetchPosts";
import { MAX_BACKOFF_IN_MS } from "../../config";
import { AwaitedReturnType } from "../../typescript/AwaitedReturnType";
import { todayOrRandomPost } from "../../utils/todayOrRandomPost";
import {
    IPostsFetchFailed,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../Actions";
import { FETCH_POSTS_URI } from "../reducers/postReducer";
import { ReduxAction } from "../ReduxAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED =
    "Maximum timeout exceeded. Fetching posts from server failed.";

function* fetchPostsWorkerSaga(
    action: IPostsFetchRequested | IPostsFetchFailed
) {
    const fetchPostRequested =
        action.type === ReduxAction.PostsFetchRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff: ReturnType<typeof backoffInMs> = yield select(
            backoffInMs
        );
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(TIMEOUT_EXCEEDED);
        }
        const posts: AwaitedReturnType<typeof fetchPosts> = yield call(
            fetchPosts,
            FETCH_POSTS_URI
        );
        const maybeTodaysPost = todayOrRandomPost(posts);
        const success: IPostsFetchSucceeded = {
            type: ReduxAction.PostsFetchSucceeded,
            payload: {
                post: maybeTodaysPost,
                now: new Date(),
                posts: posts,
            },
        };
        yield put(success);
    } catch (e) {
        yield* handleFetchFailed(e, fetchPostRequested);
    }
}

function* handleFetchFailed(e: Error, action: IPostsFetchRequested) {
    if (e.message === TIMEOUT_EXCEEDED) {
        const finalErrorAction: IPostsFetchFailedTimeoutExceeded = {
            type: ReduxAction.PostsFetchFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostsFetchFailed = {
            type: ReduxAction.PostsFetchFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* fetchPostsSaga() {
    yield takeLatest(
        [ReduxAction.PostsFetchRequested, ReduxAction.PostsFetchFailed],
        fetchPostsWorkerSaga
    );
}

export default fetchPostsSaga;
