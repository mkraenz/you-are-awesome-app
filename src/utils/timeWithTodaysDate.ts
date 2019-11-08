import { DateTime } from "luxon";

export const timeWithTodaysDate = (time: Date, now = new Date()) => {
    const luxonNow = DateTime.fromJSDate(now);
    return DateTime.fromJSDate(time)
        .set({
            year: luxonNow.year,
            month: luxonNow.month,
            day: luxonNow.day,
        })
        .toJSDate();
};
