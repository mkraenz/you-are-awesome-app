import { IMessage } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type ContributeAction =
    | ISubmitMessageFailed
    | ISubmitMessageSucceeded
    | ISubmitMessageRequested
    | ISubmitMessageFailedTimeoutExceeded
    | IDeleteMyContributions;

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
    payload: { id: string };
}

export interface ISubmitMessageFailedTimeoutExceeded {
    type: ActionType.SubmitMessageFailedTimeoutExceeded;
    payload: {
        originalAction: ISubmitMessageRequested;
        error: Error;
    };
    error: true;
}

export type IDeleteMyContributions = IActionWithPayload<
    ActionType.DeleteMyContributions,
    { ids: string[]; previousMessagesCount: number }
>;
