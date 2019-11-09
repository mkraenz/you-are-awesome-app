import { Notifications } from "expo";
import { DateTime } from "luxon";
import { call, select, takeLatest } from "redux-saga/effects";
import { notificationErrorMsg } from "../../config";
import { toIsoDateString } from "../../utils/toTodayString";
import { ISetNotificationsState } from "../Actions";
import { IPostContent, PostWithDate } from "../IPost";
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
    const posts: ReturnType<typeof futurePosts> = yield select(futurePosts);
    yield call(
        maybeScheduleNotifications,
        action.payload.enabled,
        action.payload.scheduledTime,
        posts
    );
}

export async function maybeScheduleNotifications(
    notificationsEnabled: boolean,
    scheduledTime: Date,
    futurePosts: PostWithDate[]
) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (notificationsEnabled) {
        for (const post of futurePosts) {
            await scheduleNotification(post, scheduledTime);
        }
        await scheduleFallbackNotifications(futurePosts, scheduledTime);
    }
}

export const scheduleNotification = async (
    post: PostWithDate,
    scheduledTime: Date
) => {
    try {
        // possibly special case for first post which might be for today
        if (scheduledTimePassed(post, scheduledTime)) {
            return; // scheduling in the past would result in an Android error
        }
        await Notifications.scheduleLocalNotificationAsync(
            toNotification(post),
            { time: atPostDateAndScheduledTime(post, scheduledTime) }
        );
    } catch (error) {
        throw new Error(
            `${notificationErrorMsg} - OriginalErrorMessage: ${error.message} - OriginalErrorStack: ${error.stack}`
        );
    }
};

type DateStamped = Pick<PostWithDate, "isodate">;

export const scheduledTimePassed = (
    post: DateStamped,
    scheduledTime: Date,
    now = new Date()
) => new Date(atPostDateAndScheduledTime(post, scheduledTime)) <= now;

export const toNotification = (post: IPostContent) => ({
    title: `${post.author} from ${post.country}`,
    body: post.text,
});

export const atPostDateAndScheduledTime = (
    post: DateStamped,
    scheduledTime: Date
) => {
    // NOTE: not sure if isodate is always only the date, or might include time too
    const isoPostDate = toIsoDateString(new Date(post.isodate));
    const isoTime = scheduledTime.toISOString().slice(11);
    const postDateAtScheduledTime = `${isoPostDate}T${isoTime}`;
    const date = new Date(postDateAtScheduledTime);
    return date.getTime();
};

/** when all cached posts are in the past, fall back to this */
const scheduleFallbackNotifications = async (
    futurePosts: PostWithDate[],
    scheduledTime: Date
) => {
    const lastPost = futurePosts.reduce((latestPost, post) =>
        post.isodate > latestPost.isodate ? post : latestPost
    );
    const lastOccurrence = atPostDateAndScheduledTime(lastPost, scheduledTime);
    const firstFallbackOccurrence = DateTime.fromMillis(lastOccurrence)
        .plus({ day: 1 })
        .toMillis();
    await Notifications.scheduleLocalNotificationAsync(
        {
            title: "Action requested. Click to open",
            body:
                "A new awesome message! To get tomorrow's message via notification as usual, simply open your app once.",
        },
        { time: firstFallbackOccurrence, repeat: "day" }
    );
};
