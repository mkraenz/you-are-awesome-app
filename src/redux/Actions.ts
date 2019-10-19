import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostAdded {
    type: ReduxAction.PostAdded;
    payload: IPost;
}

export interface IPostFetched {
    type: ReduxAction.PostFetched;
    payload: IPost;
}

export interface IPostSendFailed {
    type: ReduxAction.PostSendFailed;
    payload: {
        originalAction: IPostAdded;
        error: Error;
    };
    error: true;
}

export interface IPostSendSucceeded {
    type: ReduxAction.PostSendSucceeded;
    payload: IPost;
}