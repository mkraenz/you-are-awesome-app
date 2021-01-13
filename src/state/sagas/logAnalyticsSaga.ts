import { call, select, takeEvery } from "redux-saga/effects";
import { Analytics } from "../../api/Analytics";
import { ActionType } from "../actions/ActionType";
import { ISetLanguage, IToggleDarkThemeAction } from "../actions/IAppAction";
import { IAddToFavorites } from "../actions/IFavoritesAction";
import { ISubmitMessageRequested } from "../actions/SubmitMessageAction";
import { countMyContributions, darkModeEnabled, language } from "../selectors";

/**
 *  Note: ToggleAnalytics is not tracked here because of the specialty that we want to log
 *  before disabling analytics globally. Conversely, we want to log 'enabled' only after enabling analytics again.
 */
function* logAnalyticsWorkerSaga(
    action:
        | IToggleDarkThemeAction
        | ISubmitMessageRequested
        | ISetLanguage
        | IAddToFavorites
) {
    try {
        switch (action.type) {
            case ActionType.AddToFavorites:
                const msgId = action.payload.id;
                yield call(Analytics.logLike, msgId);
                break;
            case ActionType.SetLanguage:
                const nextLanguage: ReturnType<typeof language> = yield select(
                    language
                );
                yield call(Analytics.logLanguage, nextLanguage);
                break;
            case ActionType.ToggleDarkTheme:
                const darkModeOn: ReturnType<
                    typeof darkModeEnabled
                > = yield select(darkModeEnabled);
                yield call(Analytics.logDarkMode, darkModeOn);
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
        [
            ActionType.ToggleDarkTheme,
            ActionType.SubmitMessageRequested,
            ActionType.SetLanguage,
            ActionType.AddToFavorites,
        ],
        logAnalyticsWorkerSaga
    );
}

export default logAnalyticsSaga;
