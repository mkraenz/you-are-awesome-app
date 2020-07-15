import { requestFetchPosts } from "../../../src/state/action-creators/requestFetchPosts";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const date = new Date("2016");

    const result = requestFetchPosts(date);

    expect(result).toEqual({
        type: ActionType.PostsFetchRequested,
        payload: { now: date },
    });
});
