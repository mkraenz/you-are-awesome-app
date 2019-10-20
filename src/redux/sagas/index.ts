import { fork } from "redux-saga/effects";
import fetchPostsSaga from "./fetchPostsSaga";
import sendPostSaga from "./sendPostSaga";

export default function* rootSaga() {
    yield fork(sendPostSaga);
    yield fork(fetchPostsSaga);
}
