import { todayOrTomorrow } from "../../src/utils/todayOrTomorrow";

it("returns input for time > now", () => {
    const time = new Date(1234);
    const now = new Date(4);
    const result = todayOrTomorrow(time, now);
    expect(result).toBe(time);
});

it("returns input plus one day for time < now", () => {
    const time = new Date(5);
    const now = new Date(90);
    const result = todayOrTomorrow(time, now);
    const oneDayInMs = 1000 * 60 * 60 * 24;
    expect(result).toEqual(new Date(5 + oneDayInMs));
});

it("returns input plus one day for time = now", () => {
    const time = new Date(5);
    const now = new Date(5);
    const result = todayOrTomorrow(time, now);
    const oneDayInMs = 1000 * 60 * 60 * 24;
    expect(result).toEqual(new Date(5 + oneDayInMs));
});
