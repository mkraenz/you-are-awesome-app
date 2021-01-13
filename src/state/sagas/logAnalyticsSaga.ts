import { call, select, takeEvery } from "redux-saga/effects";
import { Analytics } from "../../api/Analytics";
import { ActionType } from "../actions/ActionType";
import { IToggleDarkThemeAction } from "../actions/IAppAction";
import { ISubmitMessageRequested } from "../actions/SubmitMessageAction";
import { countMyContributions, darkModeEnabled } from "../selectors";

function* logAnalyticsWorkerSaga(
    action: IToggleDarkThemeAction | ISubmitMessageRequested
) {
    try {
        switch (action.type) {
            case ActionType.ToggleDarkTheme:
                const enabled: ReturnType<
                    typeof darkModeEnabled
                > = yield select(darkModeEnabled);
                yield call(Analytics.logDarkMode, enabled);
                break;
            case ActionType.SubmitMessageRequested:
                const myContributionsCount: ReturnType<
                    typeof countMyContributions
                > = yield select(countMyContributions);
                yield Analytics.logContribution(myContributionsCount);
                break;
        }
    } catch (e) {
        throw new Error(`Failed to log analytics: ${e.message}`);
    }
}

function* logAnalyticsSaga() {
    yield takeEvery(
        [ActionType.ToggleDarkTheme, ActionType.SubmitMessageRequested],
        logAnalyticsWorkerSaga
    );
}

export default logAnalyticsSaga;
