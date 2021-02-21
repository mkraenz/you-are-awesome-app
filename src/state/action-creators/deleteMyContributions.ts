import { ActionType } from "../actions/ActionType";
import { IDeleteMyContributions } from "../actions/ContributeAction";

export const deleteMyContributions = (
    ids: string[],
    previousMessagesCount: number
): IDeleteMyContributions => ({
    type: ActionType.DeleteMyContributions,
    payload: { ids, previousMessagesCount },
});
