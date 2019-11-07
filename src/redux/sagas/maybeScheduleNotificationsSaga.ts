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
        const id = await Notifications.scheduleLocalNotificationAsync(
            {
                title: "You are Awesome App!",
                body: "A new awesome message! Btw, you're awesome! :)",
            },
            { time: scheduledTime.getTime(), repeat: "day" }
        );
        if (!id) {
            throw new Error(
                "Something went wrong while scheduling notifications. Please report to Mirco if you see this message."
            );
        }
    }
}

function* maybeScheduleNotificationsSaga() {
    yield takeLatest(
        [ReduxAction.SetNotificationsState],
        maybeScheduleNotificationsWorkerSaga
    );
}

export default maybeScheduleNotificationsSaga;
