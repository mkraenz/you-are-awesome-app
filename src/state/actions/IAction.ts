import { IMessage } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IAppAction } from "./IAppAction";
import { IFavoritesAction } from "./IFavoritesAction";
import { INetworkAction } from "./INetworkAction";
import { ContributeAction } from "./ContributeAction";
import { IActionWithPayload } from "./utils";

export type IAnyAction =
    | IMessageAction
    | IAppAction
    | INetworkAction
    | ContributeAction
    | IFavoritesAction;

export type IMessageAction =
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
