import { maybeGetTodaysPost } from "./maybeGetTodaysPost";

describe("maybeGetTodaysPost()", () => {
    it("returns null for empty posts array", () => {
        const today = new Date("2019-10-18");

        const result = maybeGetTodaysPost(today, []);

        expect(result).toBeNull;
    });

    it("returns today's post", () => {
        const today = new Date("2019-10-18");
        const nonMatchingIsoDate = "2000-01-01";
        const matchingIsoDate = "2019-10-18";
        const posts = [
            {
                author: "my-author-1",
                country: "my-country-1",
                id: "my-id-1",
                text: "my-text-1",
                isoDate: nonMatchingIsoDate,
            },
            {
                author: "my-author-2",
                country: "my-country-2",
                id: "my-id-2",
                text: "my-text-2",
                isoDate: matchingIsoDate,
            },
        ];

        const result = maybeGetTodaysPost(today, posts);

        expect(result).toBe(posts[1]);
    });
});
