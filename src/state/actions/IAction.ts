import { IMessage, MessageWithDate } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IAppAction } from "./IAppAction";
import { INetworkAction } from "./INetworkAction";
import { SubmitMessageAction } from "./SendPostAction";
import { IActionWithPayload } from "./utils";

export type IAnyAction =
    | IMessageAction
    | IAppAction
    | INetworkAction
    | SubmitMessageAction;

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
        messages: MessageWithDate[];
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
    IMessage
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
