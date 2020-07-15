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
        backoffInMs: 0,
    },
    action
) => {
    switch (action.type) {
        case ActionType.SubmitMessageSucceeded:
            return { ...state, backoffInMs: 0 };
        case ActionType.SubmitMessageFailed:
            return { ...state, backoffInMs: getBackoffInMs(state.backoffInMs) };
        default:
            return state;
    }
};

const getBackoffInMs = (previous: number) => {
    const oneMinute = 60000;
    if (2 * previous > oneMinute) {
        return oneMinute;
    }
    if (previous === 0) {
        return 1000;
    }
    return previous * 2;
};
