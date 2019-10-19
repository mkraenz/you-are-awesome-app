import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchPosts } from "../../api/fetchPosts";
import { MAX_BACKOFF_IN_MS } from "../../config";
import {
    IPostFetchFailed,
    IPostFetchRequested,
    IPostFetchSucceeded,
} from "../Actions";
import { PostWithDate } from "../IPost";
import { GET_POSTS_URI } from "../reducers/postReducer";
import { ReduxAction } from "../ReduxAction";
import { backoffInMs } from "../selectors";

const FINAL_ERROR_MSG =
    "Maximum timeout exceeded. Fetching posts from server failed.";

function* fetchPostsWorkerSaga(action: IPostFetchRequested | IPostFetchFailed) {
    const fetchPostRequested =
        action.type === ReduxAction.PostFetchRequested
            ? action
            : action.payload.originalAction;
    try {
        const backoff = yield select(backoffInMs);
        if (backoff > MAX_BACKOFF_IN_MS) {
            throw new Error(FINAL_ERROR_MSG);
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

function* handleFetchFailed(e: any, action: IPostFetchRequested) {
    // TODO #12, do nothing for the time being
}

function* fetchPostsSaga() {
    yield takeLatest(
        [ReduxAction.PostFetchRequested, ReduxAction.PostFetchFailed],
        fetchPostsWorkerSaga
    );
}

export default fetchPostsSaga;
