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
        default:
            return state;
    }
};
