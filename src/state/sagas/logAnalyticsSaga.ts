import { call, select, takeEvery } from "redux-saga/effects";
import { Analytics } from "../../api/Analytics";
import { Route } from "../../navigation/Route";
import { ActionType } from "../actions/ActionType";
import {
    ISetLanguage,
    ISetPushNotificationsState,
    IToggleDarkThemeAction,
} from "../actions/IAppAction";
import { IAddToFavorites, IDeleteFavorites } from "../actions/IFavoritesAction";
import {
    IDeleteMyContributions,
    ISubmitMessageRequested,
} from "../actions/SubmitMessageAction";
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
        | IDeleteFavorites
        | IDeleteMyContributions
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
            case ActionType.DeleteFavorites:
                const {
                    ids: deletedFavIds,
                    previousMessagesCount: previousFavCount,
                } = action.payload;
                yield Analytics.logDelete(
                    deletedFavIds.length,
                    deletedFavIds.length - previousFavCount,
                    Route.Favorites
                );
                break;
            case ActionType.DeleteMyContributions:
                const {
                    ids: deletedContribIds,
                    previousMessagesCount: previousContribCount,
                } = action.payload;
                yield Analytics.logDelete(
                    deletedContribIds.length,
                    previousContribCount - deletedContribIds.length,
                    Route.MyContributions
                );
                break;
        }
    } catch (e) {
        throw new Error(`Failed to log analytics: ${action.type} ${e.message}`);
    }
}

function* logAnalyticsSaga() {
    yield takeEvery(
        [
            ActionType.ToggleDarkTheme,
            ActionType.SubmitMessageRequested,
            ActionType.SetLanguage,
            ActionType.AddToFavorites,
            ActionType.DeleteFavorites,
            ActionType.DeleteMyContributions,
        ],
        logAnalyticsWorkerSaga
    );
}

export default logAnalyticsSaga;
