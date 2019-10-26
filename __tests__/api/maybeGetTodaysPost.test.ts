import { maybeGetTodaysPost } from "../../src/api/maybeGetTodaysPost";

describe("maybeGetTodaysPost()", () => {
    it("returns undefined for empty posts array", () => {
        const today = new Date("2019-10-18");

        const result = maybeGetTodaysPost(today, []);

        expect(result).toBeUndefined();
    });

    it("returns today's post", () => {
        const today = new Date("2019-10-18");
        const nonMatchingIsodate = "2000-01-01";
        const matchingIsodate = "2019-10-18";
        const posts = [
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

        const result = maybeGetTodaysPost(today, posts);

        expect(result).toBe(posts[1]);
    });
});
