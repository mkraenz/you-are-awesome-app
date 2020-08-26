import { IMessage, IMessageWithId } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IAppAction } from "./IAppAction";
import { IFavoritesAction } from "./IFavoritesAction";
import { INetworkAction } from "./INetworkAction";
import { SubmitMessageAction } from "./SubmitMessageAction";
import { IActionWithPayload } from "./utils";

export type IAnyAction =
    | IMessageAction
    | IAppAction
    | INetworkAction
    | SubmitMessageAction
    | IFavoritesAction;

export type IMessageAction =
    | ISubmitMessageRequested
    | IFetchMessagesSucceeded
    | IFetchMessagesRequested
    | IFetchMessagesFailedTimeoutExceeded;

export interface IFetchMessagesSucceeded {
    type: ActionType.FetchMessagesSucceeded;
    payload: {
        message: IMessage;
        now: Date;
        messages: IMessage[];
    };
}

export type IFetchMessagesRequested = IActionWithPayload<
    ActionType.FetchMessagesRequested,
    { now: Date }
>;

export interface IFetchMessagesFailed {
    type: ActionType.FetchMessagesFailed;
    payload: {
        originalAction: IFetchMessagesRequested;
        error: Error;
    };
    error: true;
}

export interface IFetchMessagesFailedTimeoutExceeded {
    type: ActionType.FetchMessagesFailedTimeoutExceeded;
    payload: {
        originalAction: IFetchMessagesRequested;
        error: Error;
    };
    error: true;
}

export type ISubmitMessageRequested = IActionWithPayload<
    ActionType.SubmitMessageRequested,
    IMessageWithId
>;

export interface ISubmitMessageFailed {
    type: ActionType.SubmitMessageFailed;
    payload: {
        originalAction: ISubmitMessageRequested;
        error: Error;
    };
    error: true;
}

export interface ISubmitMessageSucceeded {
    type: ActionType.SubmitMessageSucceeded;
    payload: unknown;
}

export interface ISubmitMessageFailedTimeoutExceeded {
    type: ActionType.SubmitMessageFailedTimeoutExceeded;
    payload: {
        originalAction: ISubmitMessageRequested;
        error: Error;
    };
    error: true;
}
