import { ActionType } from "../actions/ActionType";
import { IContributionRequested } from "../actions/ContributeAction";
import { IMessage } from "../state/IMessage";

export const contribute = (payload: IMessage): IContributionRequested => ({
    type: ActionType.ContributionRequested,
    payload,
});
