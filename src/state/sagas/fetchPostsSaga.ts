import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchPosts } from "../../api/fetchPosts";
import { MAX_BACKOFF_IN_MS, URI } from "../../config";
import { todayOrRandomPost } from "../../utils/todayOrRandomPost";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    IPostsFetchFailed,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../actions/IAction";
import { backoffInMs } from "../selectors";

const TIMEOUT_EXCEEDED =
    "Maximum timeout exceeded. Fetching posts from server failed.";

function* fetchPostsWorkerSaga(
    action: IPostsFetchRequested | IPostsFetchFailed
) {
    const fetchPostRequested =
        action.type === ActionType.PostsFetchRequested
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
            URI.FETCH_POSTS
        );
        const maybeTodaysPost = todayOrRandomPost(posts);
        const success: IPostsFetchSucceeded = {
            type: ActionType.PostsFetchSucceeded,
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
            type: ActionType.PostsFetchFailedTimeoutExceeded,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(finalErrorAction);
    } else {
        const errorAction: IPostsFetchFailed = {
            type: ActionType.PostsFetchFailed,
            payload: { originalAction: action, error: e },
            error: true,
        };
        yield put(errorAction);
    }
}

function* fetchPostsSaga() {
    yield takeLatest(
        [ActionType.PostsFetchRequested, ActionType.PostsFetchFailed],
        fetchPostsWorkerSaga
    );
}

export default fetchPostsSaga;
