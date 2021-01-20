import { call, select, takeEvery } from "redux-saga/effects";
import { Analytics } from "../../api/Analytics";
import { ActionType } from "../actions/ActionType";
import {
    ISetLanguage,
    ISetPushNotificationsState,
    IToggleDarkThemeAction,
} from "../actions/IAppAction";
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
        | ISetPushNotificationsState
) {
    try {
        switch (action.type) {
            case ActionType.SetPushNotificationsState:
                const notificationsEnabled = action.payload.enabled;
                const notifyTime = action.payload.scheduledTime;
                yield call(
                    Analytics.logPushNotifications,
                    notificationsEnabled,
                    notifyTime.getHours(),
                    notifyTime.getMinutes(),
                    notifyTime.getTimezoneOffset()
                );
                break;
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
