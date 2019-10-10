import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IAddPost {
    type: ReduxAction.PostAdded;
    payload: IPost;
}

export interface IPostFetched {
    type: ReduxAction.PostFetched;
    payload: IPost;
}
