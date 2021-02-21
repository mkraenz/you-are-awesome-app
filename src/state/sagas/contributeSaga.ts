import { call, put, takeEvery } from "redux-saga/effects";
import { submitContribution } from "../../api/submitContribution";
import { CONFIG } from "../../config";
import { pick } from "../../utils/pick";
import { AwaitedReturnType } from "../../utils/ts/AwaitedReturnType";
import { ActionType } from "../actions/ActionType";
import {
    IContributionFailed,
    IContributionRequested,
    IContributionSucceeded,
} from "../actions/ContributeAction";

function* contributeWorkerSaga(
    action: IContributionRequested | IContributionFailed
) {
    const contributionRequested =
        action.type === ActionType.ContributionRequested
            ? action
            : action.payload.originalAction;
    try {
        const responseData: AwaitedReturnType<
            typeof submitContribution
        > = yield call(
            submitContribution,
            contributionRequested.payload,
            CONFIG.uri.submitContribution
        );
        const success: IContributionSucceeded = {
            type: ActionType.ContributionSucceeded,
            payload: pick(responseData, ["id"]),
        };
        yield put(success);
    } catch (e) {
        yield* handleSendFailed(e, contributionRequested);
    }
}

function* handleSendFailed(e: Error, action: IContributionRequested) {
    const errorAction: IContributionFailed = {
        type: ActionType.ContributionFailed,
        payload: { originalAction: action, error: e },
        error: true,
    };
    yield put(errorAction);
}

function* contributeSaga() {
    yield takeEvery([ActionType.ContributionRequested], contributeWorkerSaga);
}

export default contributeSaga;
