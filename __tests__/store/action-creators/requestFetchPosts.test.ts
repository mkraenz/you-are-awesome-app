import { requestFetchMessages } from "../../../src/state/action-creators/requestFetchPosts";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const date = new Date("2016");

    const result = requestFetchMessages(date);

    expect(result).toEqual({
        type: ActionType.FetchMessagesRequested,
        payload: { now: date },
    });
});
