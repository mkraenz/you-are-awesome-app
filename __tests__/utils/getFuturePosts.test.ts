import { mock } from "../helpers/mocks";
import { getFuturePosts } from "../../src/utils/getFuturePosts";

it("returns empty array for empty input", () => {
    const result = getFuturePosts([]);
    expect(result).toEqual([]);
});

it("returns all posts for input only in future", () => {
    const result = getFuturePosts(mock.posts, new Date("2028"));
    expect(result).toEqual(mock.posts);
});

it("returns empty array for all posts in past", () => {
    const result = getFuturePosts(mock.posts, new Date("2040"));
    expect(result).toEqual([]);
});

it("returns posts that are in the past but still today", () => {
    const posts = [
        {
            author: "author-1",
            country: "country-1",
            id: "id-1",
            text: "text-1",
            isodate: "2029-01-01T01:55:00.000Z",
        },
    ];
    const result = getFuturePosts(posts, new Date("2029-01-01T14:55:00.000Z"));
    expect(result).toEqual(posts);
});
