import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostSendRequested {
    type: ReduxAction.PostSendRequested;
    payload: IPost;
}

export interface IPostFetched {
    type: ReduxAction.PostFetched;
    payload: IPost;
}

export interface IPostSendFailed {
    type: ReduxAction.PostSendFailed;
    payload: {
        originalAction: IPostSendRequested;
        error: Error;
    };
    error: true;
}

export interface IPostSendSucceeded {
    type: ReduxAction.PostSendSucceeded;
    payload: IPost;
}
