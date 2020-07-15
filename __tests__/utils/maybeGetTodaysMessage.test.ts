import { maybeGetTodaysMessages } from "../../src/utils/maybeGetTodaysMessage";

describe("maybeGetTodaysMessages()", () => {
    it("returns undefined for empty messages", () => {
        const today = new Date("2019-10-18");

        const result = maybeGetTodaysMessages(today, []);

        expect(result).toBeUndefined();
    });

    it("returns today's message", () => {
        const today = new Date("2019-10-18");
        const nonMatchingIsodate = "2000-01-01";
        const matchingIsodate = "2019-10-18";
        const messages = [
            {
                author: "my-author-1",
                country: "my-country-1",
                id: "my-id-1",
                text: "my-text-1",
                isodate: nonMatchingIsodate,
            },
            {
                author: "my-author-2",
                country: "my-country-2",
                id: "my-id-2",
                text: "my-text-2",
                isodate: matchingIsodate,
            },
        ];

        const result = maybeGetTodaysMessages(today, messages);

        expect(result).toBe(messages[1]);
    });
});
