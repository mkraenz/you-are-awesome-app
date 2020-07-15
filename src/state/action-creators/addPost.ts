import { ActionType } from "../actions/ActionType";
import { IPostSendRequested } from "../actions/IAction";
import { IPost } from "../state/IPost";

export const addPost = (payload: IPost): IPostSendRequested => ({
    type: ActionType.PostSendRequested,
    payload,
});
