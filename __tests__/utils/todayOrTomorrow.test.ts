import { futureOrTodayOrTomorrow } from "../../src/utils/futureOrTodayOrTomorrow";

it("returns input for time > now", () => {
    const time = new Date(1234);
    const now = new Date(4);
    const result = futureOrTodayOrTomorrow(time, now);
    expect(result).toBe(time);
});

it("returns today at time if it has not passed", () => {
    const time = new Date("2016-01-01T18:00:00.000Z");
    const now = new Date("2016-01-05T15:00:00.000Z");
    const result = futureOrTodayOrTomorrow(time, now);
    expect(result).toEqual(new Date("2016-01-05T18:00:00.000Z"));
});

it("returns tomorrow at time if today at time has passed", () => {
    const time = new Date("2016-01-01T09:00:00.000Z");
    const now = new Date("2016-01-05T15:00:00.000Z");
    const result = futureOrTodayOrTomorrow(time, now);
    expect(result).toEqual(new Date("2016-01-06T09:00:00.000Z"));
});
