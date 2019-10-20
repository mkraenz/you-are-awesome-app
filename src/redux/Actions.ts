import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostFetchSucceeded {
    type: ReduxAction.PostFetchSucceeded;
    payload: IPost;
}

export interface IPostFetchRequested {
    type: ReduxAction.PostFetchRequested;
}

export interface IPostFetchFailed {
    type: ReduxAction.PostFetchFailed;
    payload: {
        originalAction: IPostFetchRequested;
        error: Error;
    };
    error: true;
}

export interface IPostFetchFailedTimeoutExceeded {
    type: ReduxAction.PostFetchFailedTimeoutExceeded;
    payload: {
        originalAction: IPostFetchRequested;
        error: Error;
    };
    error: true;
}

export interface IPostSendRequested {
    type: ReduxAction.PostSendRequested;
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

export interface IPostSendFailedTimeoutExceeded {
    type: ReduxAction.PostSendFailedTimeoutExceeded;
    payload: {
        originalAction: IPostSendRequested;
        error: Error;
    };
    error: true;
}
