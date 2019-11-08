import { DateTime } from "luxon";
import { timeWithTodaysDate } from "./timeWithTodaysDate";

export const futureOrTodayOrTomorrow = (time: Date, now = new Date()) => {
    if (time > now) {
        return time;
    }
    if (timeWithTodaysDate(time, now) > now) {
        return timeWithTodaysDate(time, now);
    }
    return timeWithTomorrowsDate(time, now);
};

const timeWithTomorrowsDate = (time: Date, now: Date) =>
    DateTime.fromJSDate(timeWithTodaysDate(time, now))
        .plus({ days: 1 })
        .toJSDate();
