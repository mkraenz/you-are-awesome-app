import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostsFetchSucceeded {
    type: ReduxAction.PostsFetchSucceeded;
    payload: IPost;
}

export interface IPostsFetchRequested {
    type: ReduxAction.PostsFetchRequested;
}

export interface IPostsFetchFailed {
    type: ReduxAction.PostsFetchFailed;
    payload: {
        originalAction: IPostsFetchRequested;
        error: Error;
    };
    error: true;
}

export interface IPostsFetchFailedTimeoutExceeded {
    type: ReduxAction.PostsFetchFailedTimeoutExceeded;
    payload: {
        originalAction: IPostsFetchRequested;
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
