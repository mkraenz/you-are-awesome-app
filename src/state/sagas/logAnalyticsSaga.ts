import { call, select, takeEvery } from "redux-saga/effects";
import * as Sentry from "sentry-expo";
import { Analytics } from "../../api/Analytics";
import { Route } from "../../navigation/Route";
import { ActionType } from "../actions/ActionType";
import {
    IContributionRequested,
    IDeleteMyContributions,
} from "../actions/ContributeAction";
import {
    IChangePushNotificationTime,
    ISetLanguage,
    ISetPushNotificationsState,
    IToggleDarkThemeAction,
    IToggleOnboardingCompleted,
} from "../actions/IAppAction";
import { IAddToFavorites, IDeleteFavorites } from "../actions/IFavoritesAction";
import {
    countMyContributions,
    darkModeEnabled,
    language,
    onboardingCompleted,
} from "../selectors";

/**
 *  Note: ToggleAnalytics is not tracked here because of the specialty that we want to log
 *  before disabling analytics globally. Conversely, we want to log 'enabled' only after enabling analytics again.
 */
function* logAnalyticsWorkerSaga(
    action:
        | IToggleDarkThemeAction
        | IContributionRequested
        | ISetLanguage
        | IAddToFavorites
        | ISetPushNotificationsState
        | IChangePushNotificationTime
        | IDeleteFavorites
        | IDeleteMyContributions
        | IToggleOnboardingCompleted
) {
    try {
        switch (action.type) {
            case ActionType.SetPushNotificationsState:
                const notificationsEnabled = action.payload.enabled;
                const notifyTime = action.payload.scheduledTime;
                yield call(
                    Analytics.logPushNotifications,
                    notificationsEnabled,
                    notifyTime.getUTCHours(),
                    notifyTime.getUTCMinutes()
                );
                break;

            case ActionType.ChangePushNotificationTime:
                const notificationTime = action.payload.scheduledTime;
                yield call(
                    Analytics.logPushNotifications,
                    true,
                    notificationTime.getUTCHours(),
                    notificationTime.getUTCMinutes()
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
                const darkModeOn: ReturnType<typeof darkModeEnabled> =
                    yield select(darkModeEnabled);
                yield call(Analytics.logDarkMode, darkModeOn);
                break;

            case ActionType.ToggleOnboardingCompleted:
                const isOnboardingCompleted: ReturnType<
                    typeof onboardingCompleted
                > = yield select(onboardingCompleted);
                if (isOnboardingCompleted)
                    yield call(Analytics.logOnboardingCompleted);

                break;

            case ActionType.ContributionRequested:
                const myContributionsCount: ReturnType<
                    typeof countMyContributions
                > = yield select(countMyContributions);
                yield call(Analytics.logContribution, myContributionsCount);
                break;

            case ActionType.DeleteFavorites:
                const {
                    ids: deletedFavIds,
                    previousMessagesCount: previousFavCount,
                } = action.payload;
                yield call(
                    Analytics.logDelete,
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
                yield call(
                    Analytics.logDelete,
                    deletedContribIds.length,
                    previousContribCount - deletedContribIds.length,
                    Route.MyContributions
                );
                break;
        }
    } catch (e: any) {
        Sentry.Native.captureException(
            new Error(`Failed to log analytics: ${action.type} ${e.message}`)
        );
    }
}

function* logAnalyticsSaga() {
    yield takeEvery(
        [
            ActionType.SetPushNotificationsState,
            ActionType.ChangePushNotificationTime,
            ActionType.ToggleDarkTheme,
            ActionType.ContributionRequested,
            ActionType.SetLanguage,
            ActionType.AddToFavorites,
            ActionType.DeleteFavorites,
            ActionType.DeleteMyContributions,
            ActionType.ToggleOnboardingCompleted,
        ],
        logAnalyticsWorkerSaga
    );
}

export default logAnalyticsSaga;
