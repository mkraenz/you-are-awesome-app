import { random, range } from "lodash";
import { toDateOrIdentity } from "../../../src/state/persistence/DateTransform";

describe("toDateOrIdentity()", () => {
    it("maps iso date strings to JS Date", () => {
        expect(toDateOrIdentity("2020-06-01T00:00:00Z")).toEqual(
            new Date("2020-06-01")
        );
    });

    it("maps iso date strings with milliseconds to JS Date", () => {
        expect(toDateOrIdentity("2020-06-01T00:00:00.000Z")).toEqual(
            new Date("2020-06-01")
        );
    });

    it("maps iso date strings with timezone to JS Date", () => {
        expect(toDateOrIdentity("2020-06-01T00:00:00.000-03:00")).toEqual(
            new Date("2020-06-01T03:00:00Z")
        );
    });

    it("maps iso date strings with timezone with milliseconds to JS Date", () => {
        expect(toDateOrIdentity("2020-06-01T00:00:00.000-05:30")).toEqual(
            new Date("2020-06-01T05:30:00Z")
        );
    });

    it("maps partial iso date strings to itself", () => {
        expect(toDateOrIdentity("2020-06")).toEqual("2020-06");
    });

    it("maps empty string to itself", () => {
        expect(toDateOrIdentity("")).toBe("");
    });

    it("maps numbers to itself", () => {
        range(100).forEach((_) => {
            const randomInt = random(100000);
            expect(toDateOrIdentity(randomInt)).toBe(randomInt);
        });
    });
});
