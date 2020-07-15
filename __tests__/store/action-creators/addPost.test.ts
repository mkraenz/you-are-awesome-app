import { addPost } from "../../../src/state/action-creators/addPost";
import { ActionType } from "../../../src/state/actions/ActionType";
import { mock } from "../../helpers/mocks";

it("returns correct action", () => {
    const post = mock.post;

    const result = addPost(post);

    expect(result).toEqual({
        type: ActionType.PostSendRequested,
        payload: post,
    });
});
