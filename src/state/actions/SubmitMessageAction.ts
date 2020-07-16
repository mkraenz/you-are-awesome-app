import { ISubmitMessageFailed, ISubmitMessageSucceeded } from "./IAction";

// TODO move sub-actions here
export type SubmitMessageAction =
    | ISubmitMessageFailed
    | ISubmitMessageSucceeded;
