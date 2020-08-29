import { call, put, takeEvery } from "redux-saga/effects";
import { submitContribution } from "../../api/submitContribution";
import { URI } from "../../config";
import { pick } from "../../utils/pick";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    ISubmitMessageFailed,
    ISubmitMessageRequested,
    ISubmitMessageSucceeded,
} from "../actions/SubmitMessageAction";

function* submitMessageWorkerSaga(
    action: ISubmitMessageRequested | ISubmitMessageFailed
) {
    const submitMessageRequested =
        action.type === ActionType.SubmitMessageRequested
            ? action
            : action.payload.originalAction;
    try {
        const responseData: AwaitedReturnType<typeof submitContribution> = yield call(
            submitContribution,
            submitMessageRequested.payload,
            URI.SEND_MESSAGES
        );
        const success: ISubmitMessageSucceeded = {
            type: ActionType.SubmitMessageSucceeded,
            payload: pick(responseData, ["id"]),
        };
        yield put(success);
    } catch (e) {
        yield* handleSendFailed(e, submitMessageRequested);
    }
}

function* handleSendFailed(e: Error, action: ISubmitMessageRequested) {
    const errorAction: ISubmitMessageFailed = {
        type: ActionType.SubmitMessageFailed,
        payload: { originalAction: action, error: e },
        error: true,
    };
    yield put(errorAction);
}

function* submitMessageSaga() {
    yield takeEvery(
        [ActionType.SubmitMessageRequested],
        submitMessageWorkerSaga
    );
}

export default submitMessageSaga;
