import { difference } from "lodash";
import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { ContributeAction } from "../actions/ContributeAction";
import { IContributionsState } from "../state/IContributionsState";

export const contributionsReducer: Reducer<
    IContributionsState,
    ContributeAction
> = (
    state = {
        myMessages: [],
    },
    action
) => {
    switch (action.type) {
        case ActionType.ContributionRequested:
            const newMsg = action.payload;
            const alreadyInFavorites = state.myMessages.find(
                (m) => m.id === newMsg.id
            );
            if (alreadyInFavorites) {
                return state;
            }
            const messages = [action.payload, ...state.myMessages];
            const sortedMessages = messages.sort((a, b) =>
                a.isodate < b.isodate ? 1 : -1
            );
            return {
                ...state,
                myMessages: sortedMessages,
            };
        case ActionType.DeleteMyContributions:
            const currentIds = state.myMessages.map((m) => m.id);
            const remainingIds = difference(currentIds, action.payload.ids);
            const remainingMessages = state.myMessages.filter((m) =>
                remainingIds.includes(m.id)
            );
            return { ...state, myMessages: remainingMessages };
        default:
            return state;
    }
};
