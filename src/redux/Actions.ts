import { IPost, PostWithDate } from "./IPost";
import { ReduxAction } from "./ReduxAction";

export interface IPostsFetchSucceeded {
    type: ReduxAction.PostsFetchSucceeded;
    payload: {
        post: IPost;
        now: Date;
        posts: PostWithDate[];
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

export interface ISetNotificationsState {
    type: ReduxAction.SetNotificationsState;
    payload: {
        enabled: boolean;
        scheduledTime: Date | null;
    };
}

export interface IChangePushNotificationTime {
    type: ReduxAction.ChangePushNotificationTime;
    payload: {
        scheduledTime: Date;
    };
}

export interface IReadSettingsRequested {
    type: ReduxAction.ReadSettingsRequested;
}

export interface IReadSettingsSucceeded {
    type: ReduxAction.ReadSettingsSucceeded;
    payload: {
        enabled: boolean;
        scheduledTime: Date | null;
    };
}
