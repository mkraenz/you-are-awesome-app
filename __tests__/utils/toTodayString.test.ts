import { isToday, toDateString } from "../../src/utils/toTodayString";

it("toDateString() returns only the date", () => {
    const epoch = new Date(0);

    const result = toDateString(epoch);

    expect(result).toBe("1970-01-01");
});

describe("isToday()", () => {
    it("returns false for 2016-01-01", () => {
        const notToday = new Date("2016");
        const today = new Date("2015");
        global.Date = jest.fn(() => today) as any;

        const result = isToday(notToday);

        expect(result).toBe(false);
    });

    it("returns true for today", () => {
        const todayForInput = new Date("2016");
        const today = new Date("2016");
        global.Date = jest.fn(() => today) as any;

        const result = isToday(todayForInput);

        expect(result).toBe(true);
    });
});
