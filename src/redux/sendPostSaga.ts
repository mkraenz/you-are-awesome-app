import { call, put, takeEvery } from "redux-saga/effects";
import { IAddPost } from "./Actions";
import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: IAddPost): any {
    try {
        const user = yield call(sendPostToServer, action.payload);
        yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* sendPostSaga(): any {
    yield takeEvery(ReduxAction.PostAdded, fetchUser);
}

export default sendPostSaga;

const sendPostToServer = async (post: IPost) => {
    const response = await fetch("http://httpbin.org/post", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "error",
        body: JSON.stringify(post),
    });
    console.log(`url: ${response.url}`);
    const data = await response.json();
    console.log("data: " + data);
};
