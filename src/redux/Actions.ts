import { IPost } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostsFetchSucceeded {
    type: ReduxAction.PostsFetchSucceeded;
    payload: {
        post: IPost;
        now: Date;
    };
}

export interface IPostsFetchRequested {
    type: ReduxAction.PostsFetchRequested;
    payload: {
        now: Date;
    };
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
    payload: unknown;
}

export interface IPostSendFailedTimeoutExceeded {
    type: ReduxAction.PostSendFailedTimeoutExceeded;
    payload: {
        originalAction: IPostSendRequested;
        error: Error;
    };
    error: true;
}

export interface INetInfoChanged {
    type: ReduxAction.NetInfoChanged;
    payload: {
        connected: boolean;
    };
}
