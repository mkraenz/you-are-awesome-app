import { ActionType } from "../actions/ActionType";
import { IFetchMessagesRequested } from "../actions/IAction";

export const requestFetchMessages = (now: Date): IFetchMessagesRequested => {
    return {
        type: ActionType.FetchMessagesRequested,
        payload: { now },
    };
};
