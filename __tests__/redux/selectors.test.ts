import {
    backoffInMs,
    connectedToInternet,
    futurePosts,
} from "../../src/redux/selectors";
import { mock } from "../helpers/mocks";

it("backoffInMs returns backoff", () => {
    const state = {
        networking: { backoffInMs: 1337 },
    };

    const result = backoffInMs(state);

    expect(result).toBe(1337);
});

it("futurePosts returns future posts", () => {
    const state = {
        app: { posts: mock.posts },
    };

    const result = futurePosts(state);

    expect(result).toEqual(mock.posts);
});

it("connectedToInternet returns whether internet connection exists", () => {
    const state = {
        netInfo: { connected: false },
    };

    const result = connectedToInternet(state);

    expect(result).toEqual(false);
});
