import { ReduxAction } from "../../../src/redux/ReduxAction";
import { mock } from "../../helpers/mocks";
import { addPost } from "../../../src/redux/action-creators/addPost";

it("returns correct action", () => {
    const post = mock.post;

    const result = addPost(post);

    expect(result).toEqual({
        type: ReduxAction.PostSendRequested,
        payload: post,
    });
});
