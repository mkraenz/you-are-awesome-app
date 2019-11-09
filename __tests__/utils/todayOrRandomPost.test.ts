import { mock } from "../helpers/mocks";
import { todayOrRandomPost } from "../../src/utils/todayOrRandomPost";

it("returns todays post if available", () => {
    const result = todayOrRandomPost(
        mock.posts,
        new Date(mock.posts[1].isodate)
    );
    expect(result).toBe(mock.posts[1]);
});

it("returns random post if todays post unavailable", () => {
    const result = todayOrRandomPost(mock.posts, new Date("2000"));
    expect(mock.posts).toContain(result);
});
