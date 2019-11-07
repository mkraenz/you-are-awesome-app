import { DateTime } from "luxon";

export const todayOrTomorrow = (time: Date, now = new Date()) => {
    return time > now
        ? time
        : DateTime.fromJSDate(time)
              .plus({ days: 1 })
              .toJSDate();
};
