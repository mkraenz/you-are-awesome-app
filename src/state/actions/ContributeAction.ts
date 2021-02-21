import { IMessage } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type ContributeAction =
    | IContributionFailed
    | IContributionSucceeded
    | IContributionRequested
    | IDeleteMyContributions;

export type IContributionRequested = IActionWithPayload<
    ActionType.ContributionRequested,
    IMessage
>;

export type IContributionFailed = IActionWithPayload<
    ActionType.ContributionFailed,
    {
        originalAction: IContributionRequested;
        error: Error;
    },
    true
>;

export type IContributionSucceeded = IActionWithPayload<
    ActionType.ContributionSucceeded,
    { id: string }
>;

export type IDeleteMyContributions = IActionWithPayload<
    ActionType.DeleteMyContributions,
    { ids: string[]; previousMessagesCount: number }
>;
