import { IPostSendRequested } from "../Actions";
import { IPost } from "../IPost";
import { ReduxAction } from "../ReduxAction";

export const addPost = (payload: IPost): IPostSendRequested => ({
    type: ReduxAction.PostSendRequested,
    payload,
});
