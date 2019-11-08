import { timeWithTodaysDate } from "../../src/utils/timeWithTodaysDate";

it("returns the time with todays date for past time", () => {
    const time = new Date("2017-01-01T08:12:31.789Z");
    const now = new Date("2028-11-30T15:55:00.000Z");
    const result = timeWithTodaysDate(time, now);
    expect(result).toEqual(new Date("2028-11-30T08:12:31.789Z"));
});

it("returns the time with todays date for future time", () => {
    const time = new Date("2028-11-30T15:55:00.000Z");
    const now = new Date("2017-01-01T08:12:31.789Z");
    const result = timeWithTodaysDate(time, now);
    expect(result).toEqual(new Date("2017-01-01T15:55:00.000Z"));
});
