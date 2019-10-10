import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IAddPost {
    type: ReduxAction.AddPost;
    payload: IPost;
}
