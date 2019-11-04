import { Notifications } from "expo";
import { call, takeLatest } from "redux-saga/effects";
import { ISetNotificationsState } from "../Actions";
import { ReduxAction } from "../ReduxAction";

function* maybeScheduleNotificationsWorkerSaga(action: ISetNotificationsState) {
    yield call(
        maybeScheduleNotifications,
        action.payload.enabled,
        action.payload.scheduledTime
    );
}

async function maybeScheduleNotifications(
    notificationsEnabled: boolean,
    scheduledTime: Date
) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (notificationsEnabled) {
        await Notifications.scheduleLocalNotificationAsync(
            { title: "You are Awesome App!", body: "today's message" + Date() },
            { time: scheduledTime, repeat: "day" }
        );
    }
}

function* maybeScheduleNotificationsSaga() {
    yield takeLatest(
        [ReduxAction.SetNotificationsState],
        maybeScheduleNotificationsWorkerSaga
    );
}

export default maybeScheduleNotificationsSaga;
