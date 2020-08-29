import MockDate from "mockdate";
import { isToday, toIsoDateString } from "../../src/utils/toTodayString";

it("toIsoDateString() returns only the date", () => {
    const epoch = new Date(0);

    const result = toIsoDateString(epoch);

    expect(result).toBe("1970-01-01");
});

describe("isToday()", () => {
    afterEach(() => {
        MockDate.reset();
    });
    it("returns false if it's not today", () => {
        MockDate.set(new Date("2015"));
        const notToday = new Date("2016");

        const result = isToday(notToday);

        expect(result).toBe(false);
    });

    it("returns true for today", () => {
        MockDate.set(new Date("2016"));
        const todayForInput = new Date("2016");

        const result = isToday(todayForInput);

        expect(result).toBe(true);
    });
});
