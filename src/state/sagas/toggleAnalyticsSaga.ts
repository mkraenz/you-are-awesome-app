import { call, select, takeLatest } from "redux-saga/effects";
import { enableAnalytics } from "../../api/native-api/enableAnalytics";
import { ActionType } from "../actions/ActionType";
import { IToggleAnalytics } from "../actions/IAppAction";
import { analyticsEnabled } from "../selectors";

function* toggleAnalyticsWorkerSaga(_: IToggleAnalytics) {
    try {
        const analyticsOn = yield select(analyticsEnabled);
        yield call(enableAnalytics, analyticsOn);
    } catch (e) {
        throw new Error(`Failed to toggle analytics: ${e.message}`);
    }
}

function* toggleAnalyticsSaga() {
    yield takeLatest([ActionType.ToggleAnalytics], toggleAnalyticsWorkerSaga);
}

export default toggleAnalyticsSaga;
