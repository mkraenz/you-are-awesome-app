import { Notifications } from "expo";
import { call, select, takeLatest } from "redux-saga/effects";
import { notificationErrorMsg } from "../../config";
import { toIsoDateString } from "../../utils/toTodayString";
import { ISetNotificationsState } from "../Actions";
import { PostWithDate } from "../IPost";
import { ReduxAction } from "../ReduxAction";
import { futurePosts } from "../selectors";

export default maybeScheduleNotificationsSaga;

function* maybeScheduleNotificationsSaga() {
    yield takeLatest(
        [ReduxAction.SetNotificationsState],
        maybeScheduleNotificationsWorkerSaga
    );
}

function* maybeScheduleNotificationsWorkerSaga(action: ISetNotificationsState) {
    const posts = yield select(futurePosts);
    yield call(
        maybeScheduleNotifications,
        action.payload.enabled,
        action.payload.scheduledTime,
        posts
    );
}

async function maybeScheduleNotifications(
    notificationsEnabled: boolean,
    scheduledTime: Date,
    futurePosts: PostWithDate[]
) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (notificationsEnabled) {
        for (const post of futurePosts) {
            await scheduleNotification(post, scheduledTime);
        }
    }
}

const scheduleNotification = async (
    post: PostWithDate,
    scheduledTime: Date
) => {
    // possibly special case for first entry
    if (todayButScheduledTimePassed(post, scheduledTime)) {
        return; // scheduling in the past would result in an Android error
    }
    const id = await Notifications.scheduleLocalNotificationAsync(
        toNotification(post),
        { time: atPostDateAndScheduledTime(post, scheduledTime) }
    );
    if (!id) {
        throw new Error(notificationErrorMsg);
    }
};

const todayButScheduledTimePassed = (post: PostWithDate, scheduledTime: Date) =>
    new Date(atPostDateAndScheduledTime(post, scheduledTime)) <= new Date();

export const toNotification = (post: PostWithDate) => ({
    title: "You are Awesome App!",
    body: `${post.text} - ${post.author} from ${post.country}`,
});

const atPostDateAndScheduledTime = (
    post: Pick<PostWithDate, "isodate">,
    scheduledTime: Date
) => {
    // NOTE: not sure if isodate is always only 10 chars long, or might include time too
    const isoPostDate = toIsoDateString(new Date(post.isodate));
    const isoTime = scheduledTime.toISOString().slice(11);
    const postDateAtScheduledTime = `${isoPostDate}T${isoTime}`;
    const date = new Date(postDateAtScheduledTime);
    return date.getTime();
};
