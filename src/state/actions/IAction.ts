import { IPost, PostWithDate } from "../state/IPost";
import { ActionType } from "./ActionType";
import { IAppAction } from "./IAppAction";
import { INetworkAction } from "./INetworkAction";
import { SendPostAction } from "./SendPostAction";
import { IActionWithPayload } from "./utils";

export type IAnyAction =
    | IPostAction
    | IAppAction
    | INetworkAction
    | SendPostAction;

export type IPostAction =
    | IPostSendRequested
    | IPostsFetchSucceeded
    | IPostsFetchRequested
    | IPostsFetchFailedTimeoutExceeded;

export interface IPostsFetchSucceeded {
    type: ActionType.PostsFetchSucceeded;
    payload: {
        post: IPost;
        now: Date;
        posts: PostWithDate[];
    };
}

export type IPostsFetchRequested = IActionWithPayload<
    ActionType.PostsFetchRequested,
    { now: Date }
>;

export interface IPostsFetchFailed {
    type: ActionType.PostsFetchFailed;
    payload: {
        originalAction: IPostsFetchRequested;
        error: Error;
    };
    error: true;
}

export interface IPostsFetchFailedTimeoutExceeded {
    type: ActionType.PostsFetchFailedTimeoutExceeded;
    payload: {
        originalAction: IPostsFetchRequested;
        error: Error;
    };
    error: true;
}

export type IPostSendRequested = IActionWithPayload<
    ActionType.PostSendRequested,
    IPost
>;

export interface IPostSendFailed {
    type: ActionType.PostSendFailed;
    payload: {
        originalAction: IPostSendRequested;
        error: Error;
    };
    error: true;
}

export interface IPostSendSucceeded {
    type: ActionType.PostSendSucceeded;
    payload: unknown;
}

export interface IPostSendFailedTimeoutExceeded {
    type: ActionType.PostSendFailedTimeoutExceeded;
    payload: {
        originalAction: IPostSendRequested;
        error: Error;
    };
    error: true;
}
