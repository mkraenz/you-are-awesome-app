import { ActionType } from "../actions/ActionType";
import { IDeleteMyContributions } from "../actions/SubmitMessageAction";

export const deleteMyContributions = (
    ids: string[]
): IDeleteMyContributions => ({
    type: ActionType.DeleteMyContributions,
    payload: { ids },
});
