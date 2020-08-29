import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { SubmitMessageAction } from "../actions/SubmitMessageAction";
import { ISubmitMessageState } from "../state/ISubmitMessageState";

/** exponential backoff for submitting a new message to the server */
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
        case ActionType.SubmitMessageSucceeded:
            return { ...state };
        case ActionType.SubmitMessageFailed:
            return { ...state };
        default:
            return state;
    }
};
