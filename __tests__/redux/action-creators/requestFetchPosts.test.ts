import { ReduxAction } from "../../../src/redux/ReduxAction";
import { requestFetchPosts } from "../../../src/redux/action-creators/requestFetchPosts";

it("returns correct action", () => {
    const date = new Date("2016");

    const result = requestFetchPosts(date);

    expect(result).toEqual({
        type: ReduxAction.PostsFetchRequested,
        payload: { now: date },
    });
});
