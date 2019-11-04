import { atTime } from "./atTime";

it("can return today", () => {
    const result = atTime(17, 37, new Date("2016"));

    // new Date() will automatically take the timezoneoffset into account so we have to adjust
    result.setTime(result.getTime() - result.getTimezoneOffset() * 60 * 1000);
    expect(result.toISOString()).toBe("2016-01-01T17:37:00.000Z");
});

it("can return tomorrow if scheduled hour already passed", () => {
    const result = atTime(17, 37, new Date("2016-01-01T23:37"));

    // new Date() will automatically take the timezoneoffset into account so we have to adjust
    result.setTime(result.getTime() - result.getTimezoneOffset() * 60 * 1000);
    expect(result.toISOString()).toBe("2016-01-02T17:37:00.000Z");
});
