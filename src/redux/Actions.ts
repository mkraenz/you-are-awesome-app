import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostFetchSucceeded {
    type: ReduxAction.PostsFetchSucceeded;
    payload: IPost;
}

export interface IPostFetchRequested {
    type: ReduxAction.PostsFetchRequested;
}

export interface IPostFetchFailed {
    type: ReduxAction.PostsFetchFailed;
    payload: {
        originalAction: IPostFetchRequested;
        error: Error;
    };
    error: true;
}

export interface IPostFetchFailedTimeoutExceeded {
    type: ReduxAction.PostsFetchFailedTimeoutExceeded;
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
