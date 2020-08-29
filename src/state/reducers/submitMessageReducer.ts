import { difference } from "lodash";
import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { SubmitMessageAction } from "../actions/SubmitMessageAction";
import { ISubmitMessageState } from "../state/ISubmitMessageState";

export const submitMessageReducer: Reducer<
    ISubmitMessageState,
    SubmitMessageAction
> = (
    state = {
        myMessages: [],
    },
    action
) => {
    switch (action.type) {
        case ActionType.SubmitMessageRequested:
            return {
                ...state,
                myMessages: [...state.myMessages, action.payload],
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
