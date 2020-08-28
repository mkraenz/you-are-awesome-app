import { IMessageWithId } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type SubmitMessageAction =
    | ISubmitMessageFailed
    | ISubmitMessageSucceeded
    | ISubmitMessageRequested
    | ISubmitMessageFailedTimeoutExceeded;

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
